import { createRouter, createWebHistory } from 'vue-router'
import Chatroom from '../components/Chatroom.vue'
import ChatroomsLobby from '../components/Chatroom.vue'



export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
          path: '/chatrooms/:id',
          name: 'Chatroom',
          component: Chatroom
        },
        {
          path: '/chatrooms',
          name: 'ChatroomsLobby',
          component: ChatroomsLobby

        }

        
    ]
    
})


