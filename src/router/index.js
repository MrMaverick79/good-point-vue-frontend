import { createRouter, createWebHistory } from 'vue-router'
import Chatroom from '../components/Chatroom.vue'
import ChatroomsLobby from '../components/ChatroomsLobby.vue'
import SignUp from '../components/SignUp.vue'

//The routes for the app 
export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
          path: '/good-point-vue-frontend/rooms/:id',
          name: 'Chatroom',
          component: Chatroom
        },
        {
          path: '/good-point-vue-frontend/rooms',
          name: 'ChatroomsLobby',
          component: ChatroomsLobby

        },
        {
          path: '/good-point-vue-frontend/signup',
          name: 'SignUp',
          component: SignUp
        }

        
    ]
    
})


