import { createStore, Store } from 'vuex'
import { UserModule, UserState } from './modules/user'
import { ContactModule, ContactState } from './modules/contact'
import { NotificationModule, NotificationState } from './modules/notification'

export interface RootState {
	user: UserState;
	contact: ContactState;
	notification: NotificationState;
}

export const store: Store<RootState> = createStore<RootState>({
	modules: {
		user: UserModule,
		contact: ContactModule,
		notification: NotificationModule,
	}
})
