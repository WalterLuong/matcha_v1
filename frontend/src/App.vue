<script lang="ts">
import { defineComponent } from 'vue'
import SettingsVue from './components/Settings.vue'
import NotificationCounter from './components/utils/NotifCounter.vue'

function isOnLoginPage() {
	return window.location.pathname !== '/login';
}

export default defineComponent({
	components: { SettingsVue, NotificationCounter },

	setup() {


		return { isOnLoginPage }
	},
})
</script>

<template>
	<div>
		<NotificationCounter v-if="isOnLoginPage()" />
		<router-view class="content_view" />
		<footer id="navigation_bar"  v-if="isOnLoginPage()">
			<router-link to="/">Home</router-link>
			<router-link to="/chat">Chat</router-link>
			<router-link to="/match">Match</router-link>
		</footer>
		<SettingsVue v-if="isOnLoginPage()"/>
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

	.content_view {
		display: flex;
		align-items: center;
		flex-direction: column;
		overflow-y: scroll;

		height: calc(100vh - 63px);
		width: calc(100vw - 28px);

		background-color: blueviolet;
	}

</style>
