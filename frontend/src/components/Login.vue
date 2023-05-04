<template>
	<div>
		<p>Login page</p>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	setup() {
		
	},

	beforeRouteEnter(to: any, from: any) {
		
		console.log("cooucou", to , from)
  	},

})
</script>
