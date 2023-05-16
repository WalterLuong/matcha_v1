
import { RootState } from "..";
import { INotification, ENotif } from "../../types";
import { generate_notif } from "../utils/generator";
import { Module } from "vuex";

function WR_ENOTIF( type?: ENotif ) {
	return (
		( type == ENotif.DEL ) ? 'DEL' :
		( type == ENotif.NEW ) ? 'NEW' :
		( type == ENotif.VUE ) ? 'VUE' :
		( type == ENotif.MES ) ? 'MES' :
		'Error')
}

export interface NotificationState {
	notification: INotification[],
	counts: number[],
}

export const NotificationModule: Module<NotificationState, RootState> = {
	state: () => ({
		notification: [] as INotification[],
		counts: [0, 0, 0, 0] as number[]
	}),
	getters: {
		getAllNotification: (state: NotificationState) => {
			return state.notification;
		},
		getCountNotification: (state: NotificationState ) => {
			return state.counts;
		},
	},
	mutations: {
		ADD_NOTIFICATION: (state: NotificationState, new_notification: INotification) => {
			state.notification.push(new_notification);
		},
		DEL_NOTIFICATION: (state: NotificationState, del_notification: INotification) => {
			state.notification.splice( state.notification.findIndex((notif: INotification) => notif == del_notification), 1 )
		},
		RESET_STORE: (state: NotificationState) => {
			state.notification.splice(0, state.notification.length);
			state.counts[0] = 0;
			state.counts[1] = 0;
			state.counts[2] = 0;
			state.counts[3] = 0;
		},
		DEL_TYPE_NOTIFICATION: (state: NotificationState, type_notification: ENotif) => {
			const rest = state.notification.filter((notif: INotification) => notif.type !== type_notification);
			console.log( rest )
			state.notification = rest
		},
		INC_COUNT: (state: NotificationState, type: ENotif | number) => {
			state.counts[ type ] += 1;
		},
		DEC_COUNT: (state: NotificationState, type: ENotif | number) => {
			state.counts[ type ] -= 1;
		},
		RESET_COUNT: (state: NotificationState, type: ENotif | number ) => {
			state.counts[ type ] = 0;
		}
	},
	actions: {
		// ------------- CONSTRUCTOR ------------- //
		addNotif: ({ commit }: any, elem: INotification) => {
			console.log("Ajout d'une notification:");
			commit('ADD_NOTIFICATION', elem);
			commit('INC_COUNT', elem.type);
		},

		// ------------- DESTRUCTOR ------------- //
		delNotif: ({ commit }: any, data: INotification ) => {
			console.log('Deletion de la notification: ', data.notifId, ' de type ', WR_ENOTIF(data.type));
			commit('DEL_NOTIFICATION', data);
			commit('DEC_COUNT', data.type);
		},
		delNotifs: ({ commit }:any ) => {
			console.log('Deletion de toutes les notifications:');
			commit('RESET_STORE');
		},
		delNotifType: ({ commit }: any, elem: ENotif) => {
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

export default NotificationModule;