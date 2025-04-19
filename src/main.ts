import {createApp} from 'vue'
import App from '@/App.vue'
import 'virtual:uno.css'
import '@/assets/styles/Main.scss'
import router from './router/index.ts'
import SvgIcon from './components/SvgIcon.vue'
import './assets/iconfont/iconfont.js';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.component('SvgIcon', SvgIcon);
app.mount('#app')
