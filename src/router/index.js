import { createRouter, createWebHistory } from 'vue-router'
const AppLayout = () =>  import('../components/AppLayout.vue')
const Home = () =>  import( '../views/homePage.vue')
const Questions = () =>  import( '../views/questionsList.vue')

const routes = [
  {
    children: [
      {
        component: Home,
        name: 'home',
        path: '/home'
      },
      {
        component: Home,
        name: 'home',
        path: '/'
      },
      {
        component: Questions,
        name: 'questions',
        path: '/questions'
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