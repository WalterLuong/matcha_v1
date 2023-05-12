
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import Notification from './Notification.vue'
import { INotification } from '../../types';

export default defineComponent({
	name: 'NotificationList',

	components: {
		Notification,
	},

	setup() {
		const store = useStore();
		const data = computed(() => {
			return store.state.notification.notification;
		});
		
		const notif_tab: INotification[] = [...data.value];

		console.log( 'notif_tab\n', notif_tab )

		return { notif_tab };
	},
})

//

</script>




<template>
	<div id="notif_list_content">
		<Notification v-for="(notif, index) in notif_tab" :key="index" :notification="notif" />
	</div>
</template>


<style>

</style>