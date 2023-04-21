import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../components/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'home',
		component: HomeView
	}
]

const router = createRouter({
	history: createWebHistory('/'),
	routes
})

export default router
