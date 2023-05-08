import { IUser } from "./IUser"

export enum EStatus {
	OFF,
	ON,
	SEE,
	WR,
}

export type IContact = {
    createdAt?: Date;
	chatId: number;
	user: IUser;
	lastMessage: string;
	status: EStatus
}