
<template>
	<form class="m-10" @submit.prevent="submitForm">
		<div class="relative z-0 w-full mb-6 group">
			<input type="email"  v-model="form.email"  name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
			<label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
		</div>

		<div class="grid md:grid-cols-2 md:gap-6">
			<div class="relative z-0 w-full mb-6 group">
				<input type="text" v-model="form.first_name" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
				<label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
			</div>
			<div class="relative z-0 w-full mb-6 group">
				<input type="text" v-model="form.last_name" name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
				<label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
			</div>
		</div>
				<div class="relative z-0 w-full mb-6 group">
			<p class="text-sm font-semibold text-gray-500 dark:text-white">Gender</p>
			<ul class="flex items-center w-full text-sm font-medium text-gray-100 bg-gray-900 border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
				<li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
					<div class="flex items-center pl-3">
						<input id="horizontal-list-radio-license" type="radio" value="1" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
						<label for="horizontal-list-radio-license" class="w-full py-3 ml-2 text-sm font-medium text-gray-100 dark:text-gray-300">Men</label>
					</div>
				</li>
				<li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
					<div class="flex items-center pl-3">
						<input id="horizontal-list-radio-id" type="radio" value="2" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
						<label for="horizontal-list-radio-id" class="w-full py-3 ml-2 text-sm font-medium text-gray-100 dark:text-gray-300">Woman</label>
					</div>
				</li>
			</ul>
		</div>
		<div class="relative z-0 w-full mb-6 group">
			<input type="password"  v-model="form.password" name="floating_password" id="floating_password" class="block py-2.5 px-0 w-full text-sm text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
			<label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
		</div>
		<div class="relative z-0 w-full mb-6 group">
			<input type="password"  v-model="form.repeatPassword" name="repeat_password" id="floating_repeat_password" class="block py-2.5 px-0 w-full text-sm text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
			<label for="floating_repeat_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
		</div>
		<button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Up</button>
	</form>
</template>


<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	setup() {

		const form = {
			email: 'ocae.lormois@gmail.com',
			password: 'test123@AA',
			gender_id: '1',
			first_name: 'maxime',
			last_name: 'lormois',
		};

		const submitForm = async () => {

			const url = 'http://localhost:5000/api/v1/auth/register';

			const options = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(form)
			};

			fetch(url, options)
			.then(response => response.json())
			.then(data => {
				// Traitez la réponse du backend ici
				console.log(data);
				
				// Réinitialisez le formulaire après la soumission
				form.email = '';
				form.password = '';
				form.gender_id = '';
				form.first_name = '';
				form.last_name = '';
			}).catch(error => {
				// Traitez les erreurs de la requête ici
				console.error(error);
			});
		};

		return {
			form,
			submitForm,
		};

	},


})
</script>
