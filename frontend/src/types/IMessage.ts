
import { IUser } from ".";

export type IMessage = {
	user: IUser;
	message: string;
    createdAt: number;
}

export type IDiscussion = {
	chatId: number;
	discussion: IMessage[];
}