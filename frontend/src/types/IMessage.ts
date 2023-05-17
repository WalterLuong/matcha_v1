
export type IMessage = {
	userId: number;
	message: string;
    createdAt: number;
}

export type IDiscussion = {
	chatId: number;
	discussion: IMessage[];
}