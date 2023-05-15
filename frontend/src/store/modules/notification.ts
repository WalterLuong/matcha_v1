
import { INotification, ENotif } from "../../types";
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
			state.counts[ new_notification.type as number ] += 1;
		},
		DEL_NOTIFICATION(state: StoreNotification, del_notification: INotification) {

			console.log(state.notification)
			console.log(`l'index a rechercher est: ${del_notification.notifId}`);


			const index = state.notification.findIndex((notif: INotification) => notif.notifId !== del_notification.notifId);

			console.log(`l'index trouver est: ${index}`);

			if (index != -1) {
				console.log('CA A MARCHER')
				state.notification = state.notification.splice(index, 1);
				state.counts[del_notification.type as number] -= 1;
			}
		},
		DEL_ALL_NOTIFICATION(state: StoreNotification) {
			state.notification.splice(0, state.notification.length);
			// je dois trouver qq d'autre pour reset mais garder la reactivite des mon comp
			state.counts[0] = 0;
			state.counts[1] = 0;
			state.counts[2] = 0;
			state.counts[3] = 0;
		},
		DEL_TYPE_NOTIFICATION(state: StoreNotification, type_notification: ENotif) {
			state.notification = state.notification.filter((notif: INotification) => notif.type !== type_notification);
			state.counts[ type_notification as number ] = 0;
		}
	},
	actions: {
		// ------------- CONSTRUCTOR ------------- //
		addNotif({ commit }: any, elem: INotification) {
			console.log("Ajout d'une notification:");
			commit('ADD_NOTIFICATION', elem);
		},

		// ------------- DESTRUCTOR ------------- //
		delNotif({ commit }: any, elem: INotification) {
			console.log('Deletion de la notification ID:', elem);
			commit('DEL_NOTIFICATION', elem);
		},
		delNotifs({ commit }:any ) {
			console.log('Deletion de toutes les notifications:');
			commit('DEL_ALL_NOTIFICATION');
		},
		delNotifType({ commit }: any, elem: ENotif) {
			console.log('Deletion de toutes les notifications TYPE:');
			commit('DEL_TYPE_NOTIFICATION', elem);
		},

		// ------------- DEBUG ------------- //
		addNotifRand({ commit }: any) {
			let new_notif: INotification = generate_notif();
			console.log('DEBUG: ajout d\'une random notification: TYPE: ' + WR_ENOTIF(new_notif.type));
			commit('ADD_NOTIFICATION', new_notif);
		},

		addNotifType({ commit }: any, elem?: ENotif) {
			console.log('DEBUG: ajout d\'une notification: TYPE: ' + WR_ENOTIF(elem));
			let new_notif: INotification = generate_notif( elem );
			commit('ADD_NOTIFICATION', new_notif);
		}

	},
};