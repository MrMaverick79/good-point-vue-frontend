import { createRouter, createWebHistory } from 'vue-router'
import Chatroom from '../components/Chatroom.vue'
import ChatroomsLobby from '../components/ChatroomsLobby.vue'



export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
          path: '/rooms/:id',
          name: 'Chatroom',
          component: Chatroom
        },
        {
          path: '/rooms',
          name: 'ChatroomsLobby',
          component: ChatroomsLobby

        }

        
    ]
    
})


