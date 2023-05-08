<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	setup() {
		
	},
})
</script>

<template>
	<div id="content_view">
		<router-link to="/match">RAPIDE</router-link>
		<router-link to="/classicMatch">CLASSIC</router-link>
	</div>
</template>

<style scoped>

	.content_view > a {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 50%;
		width: 75%;
		background-color: aquamarine;
		margin: 10px;
		border-radius: 20px;
	}

</style>>
