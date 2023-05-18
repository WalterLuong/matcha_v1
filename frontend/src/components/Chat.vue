<script lang="ts">
import { defineComponent } from 'vue'
import ContactList from './utils/ContactList.vue'

export default defineComponent({

	components: { ContactList },

	setup() {
		return {}
	},
})
</script>

<template>
	<div>
		<ContactList />
	</div>
</template>

<style>

</style>