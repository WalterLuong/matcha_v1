import { createStore } from 'vuex'

import user from './modules/user'
import contact from './modules/contact'
import discussions from './modules/discussions'
import notification from './modules/notification'

const store = createStore({
	modules: {
		user,
		contact,
		discussions,
		notification,
	}
})

export default store