import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import './style.css'

const app = createApp(App)

console.log(import.meta.env);

app.use(router)
app.use(store)
app.mount('#app')

