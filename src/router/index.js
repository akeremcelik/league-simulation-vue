import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexView.vue'
import FixtureView from "../views/FixtureView.vue";

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
  ]
})

export default router
