
<script lang="ts">
import { ComputedRef, computed, defineComponent, reactive, watch} from 'vue'
import Notification from './Notification.vue'
import { useStore } from 'vuex'
import { ENotif, INotification } from '../../types';
// import { createClient } from 'redis'


export default defineComponent({
	name: 'NotificationList',
	components: {
		Notification,
	},
	setup() {
		const store = useStore();
		const notif_tab = reactive(store.getters.getAllNotification);

		console.log(notif_tab)


		const VueNotif: ComputedRef<INotification[]> = computed(() => {
			return notif_tab.filter(( notif: INotification ) => notif.type == ENotif.VUE);
		})

		const OtherNotif: ComputedRef<INotification[]> = computed(() => {
			return notif_tab.filter(( notif: INotification ) => notif.type != ENotif.VUE)
		})


		watch(notif_tab, () => {
			console.log("change")
			VueNotif
			OtherNotif 
		})


		function handleClick() {
			console.log('STR: ', notif_tab);
			// console.log('VUE: ', VueNotif.value);
			// console.log('OTH: ', OtherNotif.value);
		}

		return { VueNotif, OtherNotif, handleClick };
	},
})


</script>


<template>
	<div id="notif_list_content">
		<button @click="handleClick">CLIC</button>
		<Notification v-for="(notifA, idxA) in VueNotif" :key="idxA" :notification="notifA" :index="idxA" />
		<Notification v-for="(notifB, idxB) in OtherNotif" :key="idxB" :notification="notifB" :index="idxB" />
	</div>
</template>

<style>
#notif_list_content {
	display: flex;
	flex-direction: column;
}
</style>
