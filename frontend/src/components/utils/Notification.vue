

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ENotif, INotification } from '../../types'
import { DTO_delNotif } from '../../types/DTO'
import store from '../../store';



export default defineComponent({
	name: 'Notification',

	props: {
		notification: {
			required: true,
			type: Object as PropType<INotification>
		},
		index: {
			required: true,
			type: Number
		}
	},

	setup( props: any) {

		const notif: INotification = props.notification;

		let new_message: string = ( notif.type == ENotif.MES && notif.contact) ? notif.contact.lastMessage
			: ( notif.type == ENotif.DEL ) ? "Malheureusement ca na pas marché! "
			: ( notif.type == ENotif.VUE ) ? "Une personne a regarder votre profile"
			: ( notif.type == ENotif.NEW ) ? "Vous avez un nouveau match!"
			: "";

		if ( new_message.length >= 28 )
			new_message = new_message.substring(0, 25).concat("...");
		
		
		const class_color = `notif_color_${notif.type.toString()}`;

		function handleClick() {
			// if (notif.type == ENotif.MES || notif.type == ENotif.NEW)
			// 	this.$router.push(`chat/${notif.contact.chatId}`);
			const dto: DTO_delNotif = { index: props.index, type: notif.type}
			store.dispatch('delNotif', dto );
		}

		return { new_message, notif, class_color, handleClick }

	}
});

</script>

<template>
	<div >
		<router-link to="">
			<div @click="handleClick" id="notif_content" :class="class_color">
				<div class="notif_photo"   >
					<img src="" alt="">
				</div>
				<div class="notif_info">
					<h1>{{ notif.contact?.user.username }}</h1>
					<p>{{ new_message ? new_message : "..." }}</p>
				</div>
			</div>
		</router-link>
	</div>
</template>


<style>

/* NEW */
.notif_color_0 {
	background-color: rgba(69, 225, 69, 0.541);
}

/* VUE */
.notif_color_1 {
	background-color: rgba(255, 247, 24, 0.622);
}

/* MES */
.notif_color_2 {
	background-color: rgba(46, 174, 229, 0.541);
}

/* DEL */
.notif_color_3 {
	background-color: rgba(213, 33, 33, 0.541);
}

.notif_photo {
	overflow: hidden;
	background-color: red;
	height: 40px;
	width: 40px;
	border-radius: 100%;
	margin-left: 5px;
	margin-right: 15px;
}

.notif_info {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.notif_info > h1 {
	text-decoration: none;
	font-size: 1.2em;
	margin: 0;
	
}

.notif_info > p {
	font-size: 0.4;
	margin: 0;
}

#notif_content {
	height: 75px;
	width: 285px;
	margin: 3px 0 0 25px;

	overflow: hidden;

	display: flex;
	flex-direction: row;
	align-items: center;
}
</style>