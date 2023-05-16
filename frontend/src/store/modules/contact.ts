import { Module } from "vuex";
import { IContact } from "../../types"
import { RootState } from "..";
import { contactsDFL } from "../utils/data";

export interface ContactState {
	list: IContact[],
}

export const ContactModule: Module<ContactState, RootState> = {
	state: () => ({
		list: contactsDFL,
	}),
	getters: {
		// Getter pour obtenir tous les contacts
		getAllContacts: (state: ContactState) => {
			return state.list;
		},
		// Getter pour obtenir un contact en fonction de l'ID
		getContactById: (state: ContactState) => (id: number) => {
			return state.list.find((contact) => contact.user.id === id);
		},
	},
	mutations: {
		ADD_CONTACT(state: ContactState, new_contact: IContact) {
			state.list.push(new_contact);
		},
		DEL_CONTACT(state: ContactState, contactId: number) {
			state.list.splice(contactId, 1);
		},
	},
	actions: {
		addContact({ commit }: any, new_contact: IContact) {
			console.log(" - Push New Contact in a store");
			commit('ADD_CONTACT', new_contact);
		},
		delContactById({ commit, state }: any, del_contact_index: number) {
			if ( state.list.length > del_contact_index ) {
				console.log(" - Push New Contact in a store");
				commit('ADD_CONTACT', del_contact_index);
			} else {
				console.log(" - ERROR: delContactById: index outside of list");
			}
		}
	},
}

export default ContactModule;