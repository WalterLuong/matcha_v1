

<template>
	<div class="flex items-center justify-center min-w-full min-h-screen bg-image">
		<div class="flex flex-col items-center bg-slate-500 p-3 form_container">
			<div class="bg-gray-900 mb-2 form_container">
				<!-- <Transition name="slide"> -->
					<LoginForm key="login-form" v-if="selectedForm" />
					<RegisterForm key="register-form" v-else />
				<!-- </Transition> -->
			</div>
			<div v-if="selectedForm" class="flex">
				<p class=" mr-2 text-white">Not have an account?</p>
				<p @click="selectedForm = !selectedForm" class="text-green-400">Signup</p>
			</div>
			<div v-else class="flex">
				<p class=" mr-2 text-white">Already have an account?</p>
				<p @click="selectedForm = !selectedForm" class="text-green-400">Signin</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginForm from './LoginForm.vue';
import RegisterForm from './RegisterForm.vue';

export default defineComponent({
	components: {LoginForm, RegisterForm},
	setup() {
		let selectedForm = ref<boolean>(true);

		return { selectedForm };
	},
})
</script>


<style>


.form_container {
	min-width: 300px;
	border-radius: 20px;
	overflow: hidden;
}

.bg-image {
  background-image: url("../../assets/images/loginImg.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  /* Autres styles CSS pour ajuster l'apparence de l'image de fond */
}

</style>