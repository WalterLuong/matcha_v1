import store from '..';
import { ENotif, EStatus, IContact, IDiscussion, IMessage, INotification, IUser } from '../../types'
import { contactDFL, userDFL, userMe } from './data';
import { LIST_BIO } from './data/bio';
import { LIST_MESSAGES } from './data/messages';
import { LIST_PRENOMS } from './data/prenoms';

function generate_number(limit: number) {
	return Math.floor(Math.random() * limit);
}

function generate_age(min: number, max: number) {
	return ( min + generate_number(max - min) )
}

function generate_name() {
	return ( LIST_PRENOMS[ generate_number( LIST_PRENOMS.length )]);
}

function generate_bio() {
	return ( LIST_BIO[ generate_number( LIST_BIO.length ) ])
}

export function generate_user( username?: string, age?: number, bio?: string ) {
	const elem: IUser = {
		username: username ? username : generate_name(),
		age: age ? age : generate_age(18, 49),
		bio: bio ? bio : generate_bio()
	};

	return elem;
}

function notif_nextId() {
	const notifications: INotification[] = store.state.notification.notification
	const nextId: number = notifications[notifications.length - 1]?.notifId + 1 | 0;
	console.log( " - generate next notif id:" + nextId )
	return ( nextId as number );
}

function contact_nextId() {
	const contact: IContact[] = store.state.contact.contact;
	const nextId: number = contact[contact.length - 1]?.chatId + 1 | 1;
	console.log( " - generate next contact id:" + nextId )
	return ( nextId as number );
}

export function generate_message( type?: ENotif ) {
	
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
	const elem: IContact = {
		createdAt: Date.now(),
		chatId: chatId ? chatId : contact_nextId(),
		user: user ? user : generate_user(),
		lastMessage: lastMessage ? lastMessage : generate_message( type ),
		status: status ? status : generate_status()
	};
	return elem;
}

export function generate_type() {
	const type = generate_number( 4 );
	console.log(' - generate type: ', type)
	return type;
}

export function generate_notif(type?: number, contact?: IContact, notifId?: number) {
	console.log( " Type : ", type );

	const elem: INotification = {
		type: type != undefined ? type : generate_type(),
		contact: type == ENotif.VUE ? contactDFL : contact ? contact : generate_contact(),
		createdAt: Date.now(),
		notifId: notifId ? notifId : notif_nextId()
	};
	return elem;
}

function discussion_nextId() {
	const discussion: IDiscussion[] = store.state.discussions.discussions;
	const nextId: number = discussion[discussion.length - 1].chatId + 1;
	console.log( " - generate next discussion id:" + nextId )
	return ( nextId as number );
}

function generate_conversation( user?: IUser ) {
	let messages: IMessage[] = [];

	for ( let i = 0; i < generate_number(30); i++) {
		messages.push( {
			user: ( i % 2 ) ? ( userMe ) : ( user ? user : userDFL ),
			message: generate_message(ENotif.MES),
			createdAt: Date.now(),
		} );
	}

	return messages;
}

export function generate_discution( chatId?: number, discussion?: IMessage[], user?: IUser ) {
	const elem: IDiscussion = {
		chatId: chatId ? chatId : discussion_nextId(),
		discussion: discussion ? discussion : generate_conversation( user )
	}

	return elem;
}
