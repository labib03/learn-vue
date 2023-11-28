import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound from '../views/NotFoundView.vue'
import CompletedView from '@/views/CompletedView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/archieved',
      name: 'archieved',
      component: CompletedView
    },
    {
      path: '/:todo',
      name: 'todo',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DetailTodoView.vue')
    }
  ]
})

export default router
