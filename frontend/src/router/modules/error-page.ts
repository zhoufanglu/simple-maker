import type { RouteRecordRaw } from 'vue-router'
import View403 from '@/views/error-page/403/index.vue'
import View401 from '@/views/error-page/401/index.vue'
import View404 from '@/views/error-page/404/index.vue'
import TimeOut from '@/views/error-page/timeout/index.vue'

const errorPage: RouteRecordRaw[] = [
  {
    path: '/404',
    name: '404',
    component: View404,
  },
  {
    path: '/401',
    name: '401',
    component: View401,
  },
  {
    path: '/403',
    name: '403',
    component: View403,
  },
  {
    path: '/timeOut',
    name: 'TimeOut',
    component: TimeOut,
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: View404,
  },
]

export default errorPage
