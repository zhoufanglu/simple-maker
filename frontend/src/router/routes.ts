import type { RouteRecordRaw } from 'vue-router'
const home = () => import('@/views/home/index.vue')
/**
 * 基础路由 base route
 */
const basePage: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: home,
    meta: { title: 'home' },
  },
]

const routes = [...basePage]

export default routes
