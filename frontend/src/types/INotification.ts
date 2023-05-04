import { IContact } from "."

export enum ENotif {
	NEW, // match
	VUE, // view profile
	MES, // messages
	DEL, // unmatch
}

export type INotification = {
	type: ENotif;
	contact: IContact;
    createdAt: Date;
	notifId: number;
}