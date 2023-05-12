import { IUser } from "./IUser"

export enum EStatus {
	OFF,
	ON,
	SEE,
	WR,
}

export type IContact = {
    createdAt?: number;
	chatId: number;
	user: IUser;
	lastMessage: string;
	status: EStatus
}