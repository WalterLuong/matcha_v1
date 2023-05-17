<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import Contact from './Contact.vue'

export default defineComponent({
	name: 'contact_list',

	components: {
		Contact,
	},



	setup() {
		const store = useStore();
    	const contactList = computed(() => [...store.getters.getAllContacts]);
		// console.log( store.state.contact.contact );


		function addContact() {
			store.dispatch('addRandomContact');
		}
		function remContact( id: number) {
			store.dispatch('delContactByIdx', id);
		}
		function print() {
			console.log(contactList.value);
		}

		return { contactList, addContact, remContact, print };
	},
})
</script>



<template>
	<div class="contact_list_container">
		<div id="contact_list" >
			<Contact @click="remContact(contact.chatId)" v-for="(contact) in contactList" :key="contact.chatId" :contact="contact"  />
		</div>
		<div id="contact_search">
			<button @click="addContact()">ADD</button>
			<button @click="print()">SHOW</button>
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
