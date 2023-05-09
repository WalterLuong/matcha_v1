import { IContact } from "."

export enum ENotif {
	NEW, // match
	VUE, // view profile
	MES, // messages
	DEL, // unmatch
}

export type NotifPack = {
	n_unmatch: number,
	n_view: number,
	n_match: number,
	n_message: number,
}

export type INotification = {
	type: ENotif;
	contact: IContact;
    createdAt: number;
	notifId: number;
}
