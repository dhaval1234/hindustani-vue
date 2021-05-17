import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import New from '../views/New.vue';
import Details from '../views/Details.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/new',
    name: 'New',
    component: New
  },
  {
    path: '/details/:id',
    name: 'details',
    component: Details,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
