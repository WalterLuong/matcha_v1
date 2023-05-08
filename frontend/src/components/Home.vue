<template>
	<div>
		<h1>HOME</h1>
		<p>Name is store is: {{ name }}</p>
	</div>
</template>

<script setup>

import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore();

const name = computed(() => {
	return store.state.user.name;
})


</script>



<style>

</style>