<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	setup() {
		let username: string = "";
		let password: string = "";

		function submitForm(event: Event): void {
			event.preventDefault();
			if (username === 'admin' && password === 'password') {
				alert('Connexion réussie !');
				username = '';
				password = '';
			} else {
				password = "";
				alert('Nom d\'utilisateur ou mot de passe incorrect.');
			}
			
		}


		return { username, password, submitForm }
	},
})
</script>

<template>
	<div class="login_form">
		<form @submit="submitForm">
			<div>
				<input type="text" id="username" v-model="username" placeholder="username" />
			</div>
			<div>
				<input type="password" id="password" v-model="password" placeholder="password"/>
			</div>
			<div>
				<p>Forgot Password?</p>
			</div>
			<button type="submit">Login</button>
		</form>
		<div>
			<p>Not a member? Signup</p>
		</div>
	</div>
</template>

<style scoped>

.login_form {
	border: 1px solid black;
	border-radius: 20px;
	padding: 10px;
}

.login_form > form {
	display: flex;
	flex-direction: column;
}

.login_form > form > button {
	border-radius: 20px;
	background-color: rgb(87, 245, 87);
}

</style>