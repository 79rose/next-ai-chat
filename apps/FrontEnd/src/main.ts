import { createApp } from 'vue'
// import { setupIdux, setupNaive } from './plugins'
import App from './App.vue'
import router from './router'
import pinia from '@/stores'
import './css/index.css'
import 'virtual:uno.css'

const app = createApp(App)

app.use(pinia)
app.use(router)
// app.use(setupIdux)
// app.use(setupNaive)
app.mount('#app')
