import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/main' },
  {
    path: '/main',
    redirect: '/index',
    component: () => import('@/panel/layouts/defaultLayout.vue'),
    children: [{ path: '/index', component: () => import('@/panel/pages/index.vue') }],
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
