import { createRouter, createWebHistory } from 'vue-router'
import constantRoutes from './constant'

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
})

export default router
