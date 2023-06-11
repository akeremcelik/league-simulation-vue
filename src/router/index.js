import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexView.vue'
import FixtureView from "../views/FixtureView.vue";
import SimulateView from "../views/SimulateView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView,
    },
    {
      path: '/fixtures',
      name: 'fixtures',
      component: FixtureView,
    },
    {
      path: '/simulate',
      name: 'simulate',
      component: SimulateView,
    },
  ]
})

export default router
