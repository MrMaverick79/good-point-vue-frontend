import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
          path: '/',
          name: 'HelloWorld',
          component: HelloWorld
        }
    ]
    
})


