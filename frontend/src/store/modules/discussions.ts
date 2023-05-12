import { IDiscussion, IMessage, IUser } from "../../types"

const user1: IUser = {
	username: 'Maxime',
	age: 25,
	bio: "code une apli de rencontre",
}

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


const mess_one: IMessage[] = [
	{ user: user1, message: "coucou", createdAt: Date.now() },
	{ user: user2, message: "salutation, ca va ?", createdAt: Date.now() },
	{ user: user1, message: "coucou", createdAt: Date.now() },
	{ user: user2, message: "salutation, ca va ?", createdAt: Date.now() },
	{ user: user1, message: "coucou", createdAt: Date.now() },
	{ user: user2, message: "salutation, ca va ?", createdAt: Date.now() },
	{ user: user2, message: "salutation, ca va ?", createdAt: Date.now() },
	{ user: user1, message: "coucou", createdAt: Date.now() },
	{ user: user2, message: "salutation, ca va ?", createdAt: Date.now() },
	{ user: user1, message: "coucou", createdAt: Date.now() },
	{ user: user1, message: "coucou", createdAt: Date.now() },
	{ user: user1, message: "coucou", createdAt: Date.now() },
	{ user: user2, message: "salutation, ca va ?", createdAt: Date.now() },
	{ user: user1, message: "coucou", createdAt: Date.now() },
	{ user: user2, message: "salutation, ca va ?", createdAt: Date.now() },
]

const mess_two: IMessage[] = [
	{ user: user1, message: "coucou", createdAt: Date.now() },
	{ user: user3, message: "salutation, ca va ?", createdAt: Date.now() },
	{ user: user1, message: "Oui trequillement", createdAt: Date.now() },
	{ user: user3, message: "Super", createdAt: Date.now() },
	{ user: user1, message: "yess je sais rien de bien inovant", createdAt: Date.now() },
	{ user: user3, message: "tu mén dira temps", createdAt: Date.now() },
	{ user: user3, message: "sinon ca va avec votre femme", createdAt: Date.now() },
	{ user: user1, message: "oui, elle rayonne mes journee", createdAt: Date.now() },
	{ user: user3, message: "j'aimerais tant que la mienne est le meme effect", createdAt: Date.now() },
	{ user: user1, message: "Hahahahahhaahahahahhahahahahhahahahahahahhahahahahah", createdAt: Date.now() },
	{ user: user1, message: "Hahahahahhaahahahahhahahahahhahahahahahahhahahahahah", createdAt: Date.now() },
	{ user: user1, message: "vraiment super drole", createdAt: Date.now() },
	{ user: user3, message: "bon ca va plutot vite enfaite..", createdAt: Date.now() },
	{ user: user1, message: "Oui calmon nous", createdAt: Date.now() },
	{ user: user3, message: "go go go", createdAt: Date.now() },
]

const mess_three: IMessage[] = [
	{ user: user4, message: "coucou", createdAt: Date.now() },
	{ user: user1, message: "salutation, ca va ?", createdAt: Date.now() },
	{ user: user4, message: "Oui trequillement", createdAt: Date.now() },
	{ user: user1, message: "Super", createdAt: Date.now() },
	{ user: user4, message: "yess je sais rien de bien inovant", createdAt: Date.now() },
	{ user: user1, message: "tu mén dira temps", createdAt: Date.now() },
	{ user: user1, message: "sinon ca va avec votre femme", createdAt: Date.now() },
	{ user: user4, message: "oui, elle rayonne mes journee", createdAt: Date.now() },
	{ user: user1, message: "j'aimerais tant que la mienne est le meme effect", createdAt: Date.now() },
	{ user: user4, message: "Hahahahahhaahahahahhahahahahhahahahahahahhahahahahah", createdAt: Date.now() },
	{ user: user4, message: "Hahahahahhaahahahahhahahahahhahahahahahahhahahahahah", createdAt: Date.now() },
	{ user: user4, message: "vraiment super drole", createdAt: Date.now() },
	{ user: user1, message: "bon ca va plutot vite enfaite..", createdAt: Date.now() },
	{ user: user4, message: "Oui calmon nous", createdAt: Date.now() },
	{ user: user1, message: "go go go", createdAt: Date.now() },
]



const discussionDFL: IDiscussion[] = [
	{ chatId: 1, discussion: mess_one },
	{ chatId: 2, discussion: mess_two },
	{ chatId: 3, discussion: mess_three },
	{ chatId: 4, discussion: mess_one },
	{ chatId: 5, discussion: mess_two },
	{ chatId: 6, discussion: mess_three },
	{ chatId: 7, discussion: mess_one },
	{ chatId: 8, discussion: mess_two },
	{ chatId: 9, discussion: mess_three },
]


export default {
	state: () => ({
		discussions: discussionDFL as IDiscussion[],
	}),
	getters: {
		getDiscussionByChatId: (state: any) => (channelId: number) => {
			return state.discussions.find((discussion: IDiscussion) => discussion.chatId == channelId);
		}
	},
	mutations: {
	},
	actions: {
	},
}