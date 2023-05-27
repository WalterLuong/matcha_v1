
<template>
	<form class="m-10" @submit.prevent="submitForm">
		<div class="relative z-0 w-full mb-6 group">
			<input type="email"  v-model="form.email"  name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white dark:text-white dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
			<label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
		</div>
		<div class="relative z-0 w-full mb-6 group">
			<input type="password"  v-model="form.password" name="floating_password" id="floating_password" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white dark:text-white dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
			<label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
		</div>
		<button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign In</button>
		<p v-if="submitError" class="text-red-500">{{ submitError }}</p>
	</form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	setup() {

		const form = {
			email: '',
			password: ''
		};

		let submitError = ''; // Variable d'état pour stocker le message d'erreur de la soumission


		const submitForm = () => {

			const url = 'http://127.0.0.1:5000/api/v1/auth/login';
			const options = {
				method: 'POST',
				headers: { 
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(form)
			};

			fetch(url, options)
			.then(response => response.json())
			.then(data => {
				// Traitez la réponse du backend ici
				console.log(data);

				// Réinitialisez les variables après la soumission
				submitError = '';
				form.email = '';
				form.password = '';

			}).catch(error => {
				// Traitez les erreurs de la requête ici
				console.error(error);
				submitError = "Une erreur s'est produite lors de la soumission du formulaire.";

			});
		};

		return {
			form,
			submitForm,
      		submitError
		};

	},


})
</script>
