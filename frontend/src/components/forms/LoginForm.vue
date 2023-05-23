<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
	setup() {
		let username: string = '';
		let password: string = '';

		function submitForm() {
			const formData = {
				username: username,
				password: password
			};

			axios.post('localhost:5433/login', formData)
			.then(response => {
				//alert('Authentification réussie !');
				console.log(response);
			})
			.catch(error => {
				//alert('Une erreur s\'est produite lors de l\'authentification !');
				console.error(error);
				username = '';
				password = '';
			});
		}

		return { username, password, submitForm }
	},
})
</script>

<template>
	<div id="login_form_container">
		<h2>Login</h2>
		<form @submit.prevent="submitForm">
		<div>
			<label for="username">Username:</label>
			<input type="text" id="username" v-model="username" />
		</div>
		<div>
			<label for="password">Password:</label>
			<input type="password" id="password" v-model="password" />
		</div>
		<div>
			<button type="submit">Login</button>
		</div>
		</form>
	</div>
</template>

<style scoped>
#login_form_container {
	display: flex;
	justify-content: center;
	align-items: center;

	border: 1px solid black;
}
</style>