import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import  {router} from './router'
import { socket } from './socket'


//see https://vueschool.io/articles/vuejs-tutorials/the-benefits-of-the-vue-3-app-initialization-code/
const gpApp = createApp(App)
gpApp
    .use(router, socket)
    // .use(socket)


gpApp.mount('#app')