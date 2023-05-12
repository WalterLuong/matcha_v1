
import { INotification, ENotif, IUser } from "../../types";
import { notifDFL } from "../utils/data";
import { generate_notif } from "../utils/generator";

function WR_ENOTIF( type: ENotif ) {
	return (
		( type == ENotif.DEL ) ? 'DEL' :
		( type == ENotif.NEW ) ? 'NEW' :
		( type == ENotif.VUE ) ? 'VUE' :
		( type == ENotif.MES ) ? 'MES' :
		'Error')
}

export default {
	state: () => ({
		notification: notifDFL as INotification[],
	}),
	getters: {
		getNumberOfNotification(state: any) {
			const counts = [
				 0,
				 0,
				 0,
				 0,
			]
		  
			state.notification.forEach((notification: INotification) => {
			  counts[(notification.type) as number]++;
			});
		  
			// console.log("counts: ", counts)
			return { counts };
		  },
	},
	mutations: {
		ADD_NOTIFICATION(state: any, new_notification: INotification) {
			state.notification.push(new_notification);
		},
		DEL_NOTIFICATION(state: any, notificationId: number) {
			state.notification.splice(notificationId, 1);
		},
		DEL_ALL_NOTIFICATION(state: any) {
			state.notification = [];
		},
		DEL_TYPE_NOTIFICATION(state: any, type_notification: ENotif) {
			state.notification = state.notification.filter((notif: INotification) => notif.type !== type_notification);
		}
	},
	actions: {
		// ------------- CONSTRUCTOR ------------- //
		addNotif({ commit }: any, elem: INotification) {
			console.log("Ajout d'une notification:");
			commit('ADD_NOTIFICATION', elem);
		},

		// ------------- DESTRUCTOR ------------- //
		dellNotifId({ commit }: any, elem: number) {
			console.log('Deletion de la notification ID:' + elem);
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

		addNotifType({ commit }: any, elem?: ENotif, user?: IUser) {
			console.log('DEBUG: ajout d\'une notification: TYPE: ' + WR_ENOTIF(elem));
			let new_notif: INotification = generate_notif( elem );
			commit('ADD_NOTIFICATION', new_notif);
		}



	},
};