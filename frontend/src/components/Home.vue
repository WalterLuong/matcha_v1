<template>
	<div>
		<NotificationHandler />
		<NotificationList />
	</div>
</template>

<script lang="ts">
import NotificationList from "./utils/NotificationList.vue"
import NotificationHandler from './debug/NotificationHandler.vue'

export default {
	name: 'Home',
	components: {
		NotificationList,
		NotificationHandler,
	},
	setup() {
		return {}
	}
}



</script>



<style>

</style>