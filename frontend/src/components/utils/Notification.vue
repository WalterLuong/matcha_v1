

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { INotification } from '../../types'

export default defineComponent({
	name: 'Notification',

	props: {
		notification: {
			required: true,
			type: Object as PropType<INotification>
		},
	},

	setup( props: any) {

		const notif: INotification = props.notification;
		console.log( notif );
		return { notif };
	}
});

</script>

<template>
	<div id="notif_content">
		<router-link to="">
			<p>aaaaaaa</p>
		</router-link>
	</div>
</template>


<style>
#notif_content {
	height: 50px;
	width: 100px;

	margin: 3px;

	border: ;
}
</style>