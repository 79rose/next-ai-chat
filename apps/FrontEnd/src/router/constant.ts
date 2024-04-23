import type { RouteRecordRaw } from 'vue-router'
import { PageEnum } from '@/enums/pageEnum'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    redirect: PageEnum.BASE_HOME_REDIRECT,
    component: () => import('@/layouts/index.vue'),
    children: [
      {
        path: 'admin-task',
        name: 'admin-task',
        component: () => import('@/views/content/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index.vue'),
  },
  // {
  //   path: PageEnum.BASE_LOGIN,
  //   name: PageEnum.BASE_LOGIN,
  //   // component: () => import('@/views/LoginView.vue'),
  // },
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: PageEnum.ERROR_PAGE_NAME,
  //   component: () => import('@/views/ErrorView.vue'),
  // },
]
export default routes
