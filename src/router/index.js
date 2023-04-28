import { createRouter, createWebHistory } from 'vue-router'
import { getAuth } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth'
const AppLayout = () =>  import('../components/AppLayout.vue')
const Home = () =>  import( '../views/homePage.vue')
const Questions = () =>  import( '../views/questionsList.vue')
const Auth = () =>  import( '../views/authPage.vue')

const routes = [
  {
    children: [
      {
        component: Home,
        name: 'home',
        path: '/',
        meta: {
          requiresAuth: true
        }
      },
      {
        component: Home,
        name: 'home',
        path: '/',
        meta: {
          requiresAuth: true
        }
      },
      {
        component: Questions,
        name: 'questions',
        path: '/questions',
        meta: {
          requiresAuth: true
        }
      },
      {
        component: Auth,
        name: 'auth',
        path: '/auth'
      }
    ],
    component: AppLayout,
    path: '/'
  },
]

const router = createRouter({
  history: createWebHistory(''),
  routes: routes
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  const auth = getAuth();

  // Check if the route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if the user is authenticated
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is authenticated, allow access to the route
        next();
      } else {
        // User is not authenticated, redirect to login page
        next('/auth');
      }
    });
  } else {
    // Route does not require authentication, allow access
    next();
  }
});

export default router