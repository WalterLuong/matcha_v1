import { INotification, ENotif, EStatus, IContact, IUser } from "../../types";

const user3: IUser = {
	username: 'Hugo',
	age: 26,
	bio: "regarde un film",
}

const user4: IUser = {
	username: 'Victor',
	age: 26,
	bio: "rammenne zelda a paris",
}

const contactDFL: IContact[] =  [
	{ chatId: 3, user: user4, lastMessage: "coucou ca awdawdawdava ?", status: EStatus.OFF },
	{ chatId: 5, user: user3, lastMessage: "coucou ca va ?", status: EStatus.OFF },
	{ chatId: 6, user: user4, lastMessage: "cawd awygduyaw  ?", status: EStatus.OFF }
]

const notifDFL: INotification[] = [
	{ type: ENotif.NEW ,contact: contactDFL[0], createdAt: Date.now(), notifId: 1},
	{ type: ENotif.DEL ,contact: contactDFL[1], createdAt: Date.now(), notifId: 1},
	{ type: ENotif.VUE ,contact: contactDFL[0], createdAt: Date.now(), notifId: 1},
	{ type: ENotif.MES ,contact: contactDFL[2], createdAt: Date.now(), notifId: 1},
	{ type: ENotif.MES ,contact: contactDFL[2], createdAt: Date.now(), notifId: 1},
	{ type: ENotif.MES ,contact: contactDFL[2], createdAt: Date.now(), notifId: 1},
]

export default {
	state: () => ({
		notification: notifDFL as INotification[],
	}),
	getters: {
		// Je voudrais avoir un compteur de chaque type de notification
		getNumberOfNotification: (state: any) => {
			return state.notification.reduce((counts: number[], notification: INotification) => {
				counts[notification.type] = (counts[notification.type] || 0) + 1;
				return counts;
			}, {});
		}
		//  RETURN : {
		// 	[ENotif.NEW]: 1,
		// 	[ENotif.DEL]: 1,
		// 	[ENotif.VUE]: 1,
		// 	[ENotif.MES]: 3
		// }


		

	},
	mutations: {
	},
	actions: {
	},
}