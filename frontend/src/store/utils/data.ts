import { INotification, ENotif, EStatus, IContact, IUser } from "../../types";

export const userDFL: IUser = {
	username: 'Anonymous',
	age: 42,
	bio: "Passionné de jeux vidéo et de réalité virtuelle",
	id: 0
}

export const userMe: IUser = {
	username: 'Maxime',
	age: 25,
	bio: "Amateur de cuisine asiatique et de saveurs exotiques",
	id: 99
}

export const contactDFL: IContact = {
	chatId: 1,
	user: userDFL,
	lastMessage: "oui pas de soucis",
	status: EStatus.OFF
}

export const user1: IUser = {
	username: 'USER1',
	age: 26,
	bio: "rammenne zelda a paris",
	id: 1
};

export const user2: IUser = {
	username: 'USER2',
	age: 26,
	bio: "rammenne zelda a paris",
	id: 2
};

export const user3: IUser = {
	username: 'USER3',
	age: 26,
	bio: "regarde un film",
	id: 3
};

export const user4: IUser = {
	username: 'USER4',
	age: 26,
	bio: "rammenne zelda a paris",
	id: 4
};

export const contactsDFL: IContact[] =  [
	{ chatId: 1, user: user1, lastMessage: "oui pas de soucis", status: EStatus.OFF },
	{ chatId: 2, user: user2, lastMessage: "", status: EStatus.OFF },
	{ chatId: 3, user: user3, lastMessage: "cawd awygduyaw  ?", status: EStatus.OFF },
	{ chatId: 4, user: user4, lastMessage: "cawd awygduyaw  ?", status: EStatus.OFF }
];

export const notifDFL: INotification[] = [
	{ type: ENotif.NEW ,contact: contactsDFL[0], createdAt: Date.now(), notifId: 1},
	{ type: ENotif.DEL ,contact: contactsDFL[1], createdAt: Date.now(), notifId: 2},
	{ type: ENotif.MES ,contact: contactsDFL[2], createdAt: Date.now(), notifId: 3},
	{ type: ENotif.VUE ,contact: contactsDFL[3], createdAt: Date.now(), notifId: 4},
];







