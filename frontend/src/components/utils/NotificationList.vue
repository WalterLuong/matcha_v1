
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { INotification } from '../../types';
import Notification from './Notification.vue'
// import { createClient } from 'redis'

export default defineComponent({
	name: 'NotificationList',
	components: {
		Notification,
	},
	setup() {
    	const store = useStore();
		let notif_tab = reactive<INotification[]>(store.state.notification.notification);
		return { notif_tab };
	},
	// async mounted() {
	// 	const url = 'redis://localhost:6378';
	// 	const redisClient = createClient({ url });
	// 	if ( !redisClient ) {
	// 		await redisClient.connect();
	// 		await redisClient.set('key', 'value');
	// 		const value = await redisClient.get('key');
	// 		console.log("In class");
	// 		console.log(value);
	// 		await redisClient.quit();
	// 	}
	// },
})

//

</script>

<template>
	<div id="notif_list_content">
		<Notification v-for="(notif, index) in notif_tab" :key="index" :notification="notif" :index='index' />
	</div>
</template>


<style>
#notif_list_content {
	display: flex;
	flex-direction: column-reverse;
}
</style>