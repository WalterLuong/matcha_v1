// FAIRE LES NOTIF COMME COMPENANT CAR DANS LAPP CEST PAS BIEN

<template>
	<div class="notification_container">
		<div class="logo_notif notif_color_1" v-if="count[1]"><p>{{ count[1] }}</p></div>
		<div class="logo_notif notif_color_0" v-if="count[0]"><p>{{ count[0] }}</p></div>
		<div class="logo_notif notif_color_2" v-if="count[2]"><p>{{ count[2] }}</p></div>
		<div class="logo_notif notif_color_3" v-if="count[3]"><p>{{ count[3] }}</p></div>
	</div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
	name: 'NotificationCounter',

	setup() {
		const store = useStore();
		const count = ref(store.state.notification.counts);
		
		
		
		console.log('NOTIFICATION COUNT' , count.value)


		return { count }
	}



}
</script>

<style scoped>
	.notification_container {
		position: absolute;
		top: 0;
		left: 0;
		width: 35px;
		height: auto;
		padding-top: 10px;
		border-radius: 0 0 25px 25px;
		background-color: rgb(0, 0, 0);
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}

	.logo_notif {
		position: relative;
		width: 30px;
		height: 30px;
		border-radius: 50px;
		margin-bottom: 5px;
		background-color: yellow;
	}

	.logo_notif > p {
		position: absolute;
		top: -15px;
		right: 2px;
		color: rgb(221, 240, 224);
		text-shadow: 1px 1px 1px rgb(80, 100, 199);
	}

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


</style>