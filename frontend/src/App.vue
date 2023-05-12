<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import SettingsVue from './components/Settings.vue'
import { useStore } from 'vuex'


export default defineComponent({
	components: { SettingsVue },

	setup() {
		const store = useStore();

	   

		const data = computed(() => store.getters.getNumberOfNotification )
		const notif = ref(data.value.counts);


		// console.log( data );

		return { notif, data }
	},

})
</script>


<template>
	<div>
		<div class="notification_container">
			<div class="logo_notif" v-if="notif[3]"><p>{{ notif[3] }}</p></div>
			<div class="logo_notif" v-if="notif[1]"><p>{{ notif[1] }}</p></div>
			<div class="logo_notif" v-if="notif[0]"><p>{{ notif[0] }}</p></div>
			<div class="logo_notif" v-if="notif[2]"><p>{{ notif[2] }}</p></div>
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

		height: calc(100vh - 63px);
		width: calc(100vw - 28px);

		background-color: blueviolet;
	}

</style>
