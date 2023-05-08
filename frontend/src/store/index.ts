import { createStore } from 'vuex'

import user from './modules/user'
import contact from './modules/contact'

const store = createStore({
	modules: {
		user,
		contact,
	}
})

export default store