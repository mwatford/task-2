import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/game',
    name: 'Game',
    component: () => import(/* webpackChunkName: "game" */ '../views/Game.vue'),
    children: [
      {
        path: 'dice',
        name: 'dice',
        component: () =>
          import(/* webpackChunkName: "dice-game" */ '../views/DiceGame.vue'),
      },
      {
        path: 'card',
        name: 'card',
        component: () =>
          import(/* webpackChunkName: "card-game" */ '../views/CardGame.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
