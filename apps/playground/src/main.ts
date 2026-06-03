import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@g03/el-plus/styles/scss'
import '@g03/theme/styles'
import './styles/base.scss'
import 'virtual:uno.css'

createApp(App).use(router).mount('#app')

