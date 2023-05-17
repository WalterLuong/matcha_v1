
import { store } from '..';
import { ENotif, EStatus, IContact, IDiscussion, IMessage, INotification, IUser } from '../../types'
import { contactDFL, } from './data';
import { LIST_BIO } from './data/bio';
import { LIST_MESSAGES } from './data/messages';
import { LIST_PRENOMS } from './data/prenoms';

function generate_number(limit: number): number {
	return Math.floor(Math.random() * limit);
}

function generate_age(min: number, max: number): number {
	return ( min + generate_number(max - min) )
}

function generate_name(): string {
	return ( LIST_PRENOMS[ generate_number( LIST_PRENOMS.length )]);
}

function generate_bio(): string {
	return ( LIST_BIO[ generate_number( LIST_BIO.length ) ])
}

function user_nextId(): number {
	const contact: IContact[] = store.getters.getAllContacts;
	const nextId: number = contact[contact.length - 1]?.user.id + 1;
	return nextId;
}

export function generate_user( username?: string, age?: number, bio?: string ) {

	const length: number = store.getters.getAllContacts.length;

	const elem: IUser = {
		username: username ? username : generate_name(),
		age: age ? age : generate_age(18, 49),
		bio: bio ? bio : generate_bio(),
		id: length ? 1 : user_nextId(),
	};
	return elem;
}

function notif_nextId() {
	const notifications: INotification[] = store.getters.getAllNotification;
	const nextId: number = notifications[notifications.length - 1]?.notifId + 1;
	// console.log( " - generate next notif id:" + nextId )
	return ( nextId as number );
}

function contact_nextId() {
	const contact: IContact[] = store.getters.getAllContacts;
	const nextId: number = contact[contact.length - 1]?.chatId + 1;
	// console.log( " - generate next chat id:" + nextId )
	return ( nextId as number );
}

export function generate_LASTmessage( type?: ENotif ) {
	
	switch (type) {
		case ENotif.DEL:
			return ( "Good Bye ;)" );
		case ENotif.NEW:
			return ( "Nouveau match, a l'attaque!" );
		case ENotif.VUE:
			return ( "A regarder votre profile" );
	}
	return ( LIST_MESSAGES[ generate_number( LIST_MESSAGES.length )]);
}

export function generate_status() {
	return generate_number( 3 );
}

export function generate_contact(chatId?: number, user?: IUser, lastMessage?: string, status?: EStatus, type?: ENotif) {

	const nextId: number = contact_nextId()

	const elem: IContact = {
		createdAt: Date.now(),
		chatId: chatId != undefined ? chatId : nextId ? nextId : 1,
		user: user ? user : generate_user(),
		lastMessage: lastMessage ? lastMessage : generate_LASTmessage( type ),
		status: status ? status : generate_status()
	};

	

	return elem;
}

export function generate_type() {
	const type = generate_number( 4 );
	return type;
}

export function generate_notif(type?: number, contact?: IContact, notifId?: number) {

	const nextId: number = notif_nextId()

	const elem: INotification = {
		type: type != undefined ? type : generate_type(),
		contact: type == ENotif.VUE ? contactDFL : contact ? contact : generate_contact(),
		createdAt: Date.now(),
		notifId: notifId ? notifId : nextId ? nextId : 1
	};
	return elem;
}


export function generate_message( userId: number, message?: string, date?: number ): IMessage {
	const elem: IMessage = {
		userId: userId,
		message: message ? message : generate_LASTmessage(ENotif.MES),
		createdAt: date ? date : Date.now(),
	};
	return elem;
}

export function generate_messages( user: IUser ): IMessage[] {
	let elem: IMessage[] = []
	for (let i = 0; i < generate_number(25); i++) {
		elem.push( generate_message( user.id ) );
	}
	return elem;
}

export function generate_discussion( contact: IContact ): IDiscussion {
	const elem: IDiscussion = {
		chatId: contact.chatId,
    	discussion: generate_messages( contact.user )
	};
	return elem;
}