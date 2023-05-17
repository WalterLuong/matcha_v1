<script lang="ts">
import { defineComponent } from 'vue'
import { IContact } from '../../types'

interface PorpsContact {
	contact: IContact;
}

export default defineComponent({
	name: 'contact',

	props: {
		contact: {
			type: Object as () => IContact,
			required: true,
		}
	},

	setup( props: PorpsContact ) {
		const contact = props.contact;

		// console.log( props.contact )

		return { contact };
	},
})
</script>

<template>
	<div class="contact_container">
		<!-- <router-link class="contact_preview" :to="`/chat/${contact.chatId}`"> -->
			<div>
				<img src="" alt="">
				<p> {{ contact.user.username }} </p>
			</div>
			<div>
				<p>{{ contact.lastMessage }}</p>
			</div>
		<!-- </router-link> -->
	</div>
</template>

<style>
.contact_container {
	background-color: red;
	overflow: hidden;
	margin: 5px;
}

.contact_preview {
	width: 80vw;
	height: 50px;
}
</style>