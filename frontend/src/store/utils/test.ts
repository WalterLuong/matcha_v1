
import store from "..";
import { ENotif, IUser } from "../../types";
import * as debug from "./generator";


export function click_test_store() {
	console.log("start:")


	console.log(store.state.notification.notification)
	store.dispatch('addNotifRand');

	// console.log(debug.generate_discution( undefined, undefined, debug.generate_user('Coralie') ))

	// console.log(debug.generate_notif( ENotif.DEL ));



	console.log("END\n\n")
}