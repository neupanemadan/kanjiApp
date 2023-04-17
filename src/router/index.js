import { createRouter, createWebHistory } from 'vue-router'
const AppLayout = () =>  import('../components/AppLayout.vue')
const Home = () =>  import( '../views/homePage.vue')

const routes = [
  {
    children: [
      {
        component: Home,
        name: 'home',
        path: '/home',
        meta: {
          requiresAuth: true,
          redirectOnExpire: true
        }
      },
      {
        component: Home,
        name: 'home',
        path: '/',
        meta: {
          requiresAuth: true,
          redirectOnExpire: true
        }
      },
    ],
    component: AppLayout,
    path: '/'
  },
]

const router = createRouter({
  history: createWebHistory(''),
  routes: routes
})

export default router