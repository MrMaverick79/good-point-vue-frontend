import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import  router from './router'
import { io } from "socket.io-client";

const socket = io("http://localhost:3000",{
    withCredentials: true});

socket.on("connect", () => {
    console.log(socket.connected , "Socket connected"); // true
  });
  
socket.on("disconnect", () => {
    console.log(socket.connected); // false
});

//see https://vueschool.io/articles/vuejs-tutorials/the-benefits-of-the-vue-3-app-initialization-code/
const gpApp = createApp(App)
gpApp
    .use(router)

gpApp.mount('#app')