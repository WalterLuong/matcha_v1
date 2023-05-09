import { IContact, EStatus, IUser } from "../../types"

const user2: IUser = {
	username: 'Walter',
	age: 26,
	bio: "attend que maxime code",
}

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
	{ chatId: 1, user: user2, lastMessage: "coucou ca va ?", status: EStatus.OFF },
	{ chatId: 2, user: user3, lastMessage: "cawd awygduyaw  ?", status: EStatus.OFF },
	{ chatId: 3, user: user4, lastMessage: "coucou ca awdawdawdava ?", status: EStatus.OFF },
	{ chatId: 4, user: user2, lastMessage: "awdawawdawdaw ca va ?", status: EStatus.OFF },
	{ chatId: 5, user: user3, lastMessage: "coucou ca va ?", status: EStatus.OFF },
	{ chatId: 6, user: user4, lastMessage: "cawd awygduyaw  ?", status: EStatus.OFF },
	{ chatId: 7, user: user2, lastMessage: "coucou ca awdawdawdava ?", status: EStatus.OFF },
	{ chatId: 8, user: user3, lastMessage: "awdawawdawdaw ca va ?", status: EStatus.OFF },
	{ chatId: 9, user: user4, lastMessage: "coucou ca va ?", status: EStatus.OFF },
];

export default {
	state: () => ({
		contact: contactDFL as IContact[],
	}),
	getters: {},
	mutations: {
	},
	actions: {
	},
}