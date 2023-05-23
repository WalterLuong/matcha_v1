<template>
	<div>
		<transition>
			<LoginForm v-if="activeForm == 'Login'" />
		</transition>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginForm  from './forms/LoginForm.vue'

export default defineComponent({
	components: {LoginForm},

	setup() {
		let activeForm: 'Login' | 'Register' | 'Forgot' = 'Login'; 


		return { activeForm }
	},

	// beforeRouteEnter(to: any, from: any) {
	// 	console.log("cooucou", to , from)
  	// },
})
</script>
