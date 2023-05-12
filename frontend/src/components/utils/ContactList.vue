<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { IContact } from '../../types';
import Contact from './Contact.vue'

export default defineComponent({
	name: 'contact_list',

	components: {
		Contact,
	},

	setup() {
		const store = useStore();
    	const contactList: IContact[] = computed(() =>  store.state.contact.contact );
		// console.log( store.state.contact.contact );
		return { contactList };
	},
})
</script>

<template>
	<div class="contact_list_container">
		<div id="contact_list" >
			<Contact v-for="(contact, index) in contactList" :key="index" :contact="contact"  />
		</div>
		<div id="contact_search">
			<p>coucou</p>
		</div>
	</div>
</template>

<style>
.contact_list_container {
	background-color: aquamarine;
	width: 75%;
	height: 100%;
}

#contact_list {
	background-color: beige;
	height: 80%;
	overflow-y: scroll;
}

#contact_search {
	height: 15%;
	background-color: blanchedalmond;
}

</style>
