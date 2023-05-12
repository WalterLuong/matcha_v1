
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore, onMounted } from 'vuex'
import Notification from './Notification.vue'

export default defineComponent({
	name: 'NotificationList',

	components: {
		Notification,
	},

	setup() {
    	const store = useStore();

		// initialiser notif_tab avec la valeur actuelle de store.state.notification.notification
		const notif_tab = ref(store.state.notification.notification);

		// observer les changements du state de notification

		console.log('notif_tab\n', notif_tab);

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