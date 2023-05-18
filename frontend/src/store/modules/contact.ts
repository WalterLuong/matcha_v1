import { Module } from "vuex";
import { EStatus, IContact } from "../../types"
import { RootState } from "..";
import { contactsDFL } from "../utils/data";
import { generate_contact } from "../utils/generator";

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

		// Muttation pour ajouter un contact avec trigger
		ADD_CONTACT(state: ContactState, new_contact: IContact) {
			state.list.push(new_contact);
		},

		// Muttation pour delete un contact avec trigger
		DEL_CONTACT(state: ContactState, contactIdx: number) {
			state.list.splice( state.list.findIndex((contact: IContact) => contact.chatId == contactIdx), 1)
		},

		// Muttation pour cahnger le status d'un contact avec trigger
		SET_STATUS(state: ContactState, elem: IContact, status: EStatus) {
			const index: number = state.list.findIndex((contact: IContact) => contact == elem );
			if (index) { state.list.at(index)!.status = status; } else { console.log("Error Set Status"); }
		}
	},
	actions: {

		// Action pour ajouter un user
		addContact({ commit }: any, new_contact: IContact) {
			console.log(" - Push New Contact in a store");
			commit('ADD_CONTACT', new_contact);
		},
		// Action pour delete un user en fonction de l'ID
		delContactByIdx({ commit }: any, del_contact_index: number) {
			console.log(" - DEL Contact in a store");
			commit('DEL_CONTACT', del_contact_index);
		},

		// DEBUG //
		addRandomContact({ commit }: any) {
			const new_contact: IContact = generate_contact();
			commit('ADD_CONTACT', new_contact)
		}
	},
}

export default ContactModule;