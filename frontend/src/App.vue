<script lang="ts">
import { defineComponent } from 'vue'
import SettingsVue from './components/Settings.vue'
import { INotification } from "./types"

export default defineComponent({
	data() {
		return {
			Notification: [] as INotification[],
			n_view: 1 as number,
			n_match: 12 as number,
			n_unmatch: 1 as number,
			n_message: 0 as number,
		}
	},

	components: { SettingsVue }

	// beforeRouteEnter(to: any, from: any) {
	// 	console.log("cooucou", to , from)
  	// },
})
</script>

<template>
	<div>
		<div class="notification_container">
			<div class="logo_notif" v-if="n_unmatch"><p>{{ n_unmatch }}</p></div>
			<div class="logo_notif" v-if="n_view"><p>{{ n_view }}</p></div>
			<div class="logo_notif" v-if="n_match"><p>{{ n_match }}</p></div>
			<div class="logo_notif" v-if="n_message"><p>{{ n_message }}</p></div>
		</div>
		<router-view class="content_view" />
		<footer id="navigation_bar">
			<router-link to="/">Home</router-link>
			<router-link to="/chat">Chat</router-link>
			<router-link to="/match">Match</router-link>
		</footer>
		<SettingsVue />
	</div>
</template>

<style scoped>
	#navigation_bar {
		position: fixed;
		bottom: 0;
		left: 0;
		width: calc(100vw - 30px);
		height: 50px;
		background-color: rgb(136, 237, 195);
		display: flex;
		justify-content: space-around;
		align-items: center;
		box-sizing: border-box;
		padding-right: 70px;
	}

	#navigation_bar > a {
		height: 100%;
		width: 25%;
		background-color: red;
		border-radius: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.notification_container {
		position: absolute;
		top: 0;
		left: 0;
		width: 35px;
		height: auto;
		padding-top: 10px;
		border-radius: 0 0 25px 25px;
		background-color: red;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}

	.logo_notif {
		position: relative;
		width: 30px;
		height: 30px;
		border-radius: 50px;
		margin-bottom: 5px;
		background-color: yellow;
	}

	.logo_notif > p {
		position: absolute;
		top: -15px;
		right: 2px;
		color: rgb(75, 81, 207);
		text-shadow: 1px 1px 1px rgb(80, 100, 199);
	}

	.content_view {
		display: flex;
		align-items: center;
		flex-direction: column;
		overflow-y: scroll;

		height: calc(100vh - 65px);
		width: calc(100vw - 35px);

		background-color: blueviolet;
	}

</style>
