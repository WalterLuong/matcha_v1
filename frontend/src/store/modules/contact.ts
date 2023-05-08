import { IContact, EStatus } from "../../types"

const userDFL = {
	username: 'Maxime',
	age: 25,
	bio: "kiff a re avec hugo",
}

const contactDFL: IContact[] =  [
	{ chatId: 1, user: userDFL, lastMessage: "coucou ca va ?", status: 0 as EStatus },
	{ chatId: 2, user: userDFL, lastMessage: "cawd awygduyaw  ?", status: 0 as EStatus },
	{ chatId: 3, user: userDFL, lastMessage: "coucou ca awdawdawdava ?", status: 0 as EStatus },
	{ chatId: 4, user: userDFL, lastMessage: "awdawawdawdaw ca va ?", status: 0 as EStatus },
	{ chatId: 1, user: userDFL, lastMessage: "coucou ca va ?", status: 0 as EStatus },
	{ chatId: 2, user: userDFL, lastMessage: "cawd awygduyaw  ?", status: 0 as EStatus },
	{ chatId: 3, user: userDFL, lastMessage: "coucou ca awdawdawdava ?", status: 0 as EStatus },
	{ chatId: 4, user: userDFL, lastMessage: "awdawawdawdaw ca va ?", status: 0 as EStatus },
	{ chatId: 1, user: userDFL, lastMessage: "coucou ca va ?", status: 0 as EStatus },
	{ chatId: 2, user: userDFL, lastMessage: "cawd awygduyaw  ?", status: 0 as EStatus },
	{ chatId: 3, user: userDFL, lastMessage: "coucou ca awdawdawdava ?", status: 0 as EStatus },
	{ chatId: 4, user: userDFL, lastMessage: "awdawawdawdaw ca va ?", status: 0 as EStatus },
	{ chatId: 1, user: userDFL, lastMessage: "coucou ca va ?", status: 0 as EStatus },
	{ chatId: 2, user: userDFL, lastMessage: "cawd awygduyaw  ?", status: 0 as EStatus },
	{ chatId: 3, user: userDFL, lastMessage: "coucou ca awdawdawdava ?", status: 0 as EStatus },
	{ chatId: 4, user: userDFL, lastMessage: "awdawawdawdaw ca va ?", status: 0 as EStatus },
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