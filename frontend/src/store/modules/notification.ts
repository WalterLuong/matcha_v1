
import { INotification, ENotif, DTO_delNotif } from "../../types";
import { notifDFL } from "../utils/data";
import { generate_notif } from "../utils/generator";

function WR_ENOTIF( type?: ENotif ) {
	return (
		( type == ENotif.DEL ) ? 'DEL' :
		( type == ENotif.NEW ) ? 'NEW' :
		( type == ENotif.VUE ) ? 'VUE' :
		( type == ENotif.MES ) ? 'MES' :
		'Error')
}

interface StoreNotification {
	notification: INotification[],
	counts: number[],
}

export default {
	state: () => ({
		notification: notifDFL as INotification[],
		counts: [1, 1, 1, 1] as number[]
	}),
	getters: {
	},
	mutations: {
		ADD_NOTIFICATION(state: StoreNotification, new_notification: INotification) {
			state.notification.push(new_notification);
		},
		DEL_NOTIFICATION(state: StoreNotification, index: number) {
			if ( state.notification.length > index) {
				// TENTATIVE DE SUPPRESSION DE MON ELEMENT:
				state.notification.splice(index, 1);
			}
		},
		RESET_STORE(state: StoreNotification) {
			state.notification.splice(0, state.notification.length);
			state.counts[0] = 0;
			state.counts[1] = 0;
			state.counts[2] = 0;
			state.counts[3] = 0;
		},
		DEL_TYPE_NOTIFICATION(state: StoreNotification, type_notification: ENotif) {
			state.notification = state.notification.filter((notif: INotification) => notif.type !== type_notification);
			state.counts[ type_notification as number ] = 0;
		},
		INC_COUNT(state: StoreNotification, type: ENotif | number) {
			state.counts[ type ] += 1;
		},
		DEC_COUNT(state: StoreNotification, type: ENotif | number) {
			state.counts[ type ] -= 1;
		},
		RESET_COUNT(state: StoreNotification, type: ENotif | number ) {
			state.counts[ type ] = 0;
		}
	},
	actions: {
		// ------------- CONSTRUCTOR ------------- //
		addNotif({ commit }: any, elem: INotification) {
			console.log("Ajout d'une notification:");
			commit('ADD_NOTIFICATION', elem);
			commit('INC_COUNT', elem.type);
		},

		// ------------- DESTRUCTOR ------------- //
		delNotif({ commit }: any, data: DTO_delNotif ) {
			console.log('Deletion de la notification: ', data.index, ' de type ', WR_ENOTIF(data.type));
			commit('DEL_NOTIFICATION', data.index);
			commit('DEC_COUNT', data.type);
		},
		delNotifs({ commit }:any ) {
			console.log('Deletion de toutes les notifications:');
			commit('RESET_STORE');
		},
		delNotifType({ commit }: any, elem: ENotif) {
			console.log('Deletion de toutes les notifications TYPE:');
			commit('DEL_TYPE_NOTIFICATION', elem);
			commit('RESET_COUNT', elem);
		},

		// ------------- DEBUG ------------- //
		// addNotifRand({ commit }: any) {
		// 	let new_notif: INotification = generate_notif();
		// 	console.log('DEBUG: ajout d\'une random notification: TYPE: ' + WR_ENOTIF(new_notif.type));
		// 	commit('ADD_NOTIFICATION', new_notif);
		// 	commit('INC_COUNT', elem);
		// },

		addNotifType({ commit }: any, elem?: ENotif) {
			console.log('DEBUG: ajout d\'une notification: TYPE: ' + WR_ENOTIF(elem));
			let new_notif: INotification = generate_notif( elem );
			commit('ADD_NOTIFICATION', new_notif);
			commit('INC_COUNT', elem);
		}

	},
};