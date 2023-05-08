import { createRouter, createWebHistory, NavigationGuardNext, RouteConfig, RouteLocationNormalized } from 'vue-router'

import HomeView from '../components/Home.vue'
import ChatView from '../components/Chat.vue'
import ChatRoomView from '../components/ChatRoom.vue'
import MatchView from '../components/Match.vue'
import LoginView from '../components/Login.vue'
import MatchMenu from '../components/MatchMenu.vue'

const routes: Array<RouteConfig> = [
	{
		path: '/',
		name: 'Home',
		component: HomeView,
	},{
		path: '/match',
		name: 'MatchMenu',
		component: MatchMenu,
	},{
		path: '/classicMatch',
		name: 'MatchClassic',
		component: MatchView,
	},{
		path: '/chat',
		name: 'Chat',
		component: ChatView,
	},{
		path: '/chat/:id',
		name: 'ChatRoom',
		component: ChatRoomView,
	},{
		path: '/login',
		name: 'Login',
		component: LoginView,
	},{
		path: '/forgotten_password',
		name: 'Match',
		component: MatchView,
	},{
		path: '/page_not_found',
		name: '404',
		component: MatchView,
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

router.beforeEach( async (to :RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
		// Placer la fonction d'autentification a la place du false
		if (false && to.name !== 'Login') {
			next({ name: 'Login', query: { redirect: to.fullPath } })
		} else {
			console.log(from.name)
			next();
		}
	})

export default router;