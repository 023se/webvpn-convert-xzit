import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import IndexView from '../views/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: IndexView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
