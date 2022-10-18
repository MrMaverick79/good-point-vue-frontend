import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import  {router} from './router'
import { socket } from './socket'
import axios from 'axios'
//TODO: Create BASE_URL

//Components
import Login from './components/Login.vue'
import SignUp from './components/SignUp.vue'



//see https://vueschool.io/articles/vuejs-tutorials/the-benefits-of-the-vue-3-app-initialization-code/
const gpApp = createApp(App)
gpApp.component('Login', Login);
gpApp.component('SignUp', SignUp);
gpApp
    .use(router, socket, axios)
    // .use(socket)


gpApp.mount('#app')