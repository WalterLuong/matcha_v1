<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	data() {
		return {
			isActive: false as boolean,
		}
	},

	setup() {

	},


})
</script>

<template>
	<div v-bind:style="{ width: isActive ? ' calc(100vw - 40px)' : ' 20px', transition: 'width 0.5s' }" id="settings_zone">
		<div id="settings_container">

		</div>
		<div id="profile_picture" @click="isActive = !isActive">
			<div id="arrondie_top">a</div>
			<img src="" alt="">
		</div>
	</div>
</template>

<style>

#settings_zone {
	position: absolute;
	bottom: 0;
	right: 0;
	height: 100vh;
	width: calc(30px);
}

#settings_container {
	position: relative;
	bottom: 0;
	right: 0;
	height: 100vh;
	width: 100%;
	background-color: red;
}

#arrondie_top {
	position: relative;
	left: 25px;
	top: -24px;
	width: 30px;
	height: 25px;
	background-color: red;
	clip-path: polygon(0% 100%, 75% 50%, 50% 75%, 100% 0%, 100% 100%);
}

#profile_picture {
	position: absolute;
	bottom: 0;
	right: 0;
	background-color: red;

	width: 75px;
	height: 80px;

	border-radius: 45% 0 0 45%;
}

</style>