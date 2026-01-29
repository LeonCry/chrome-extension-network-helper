import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/main' },
  {
    path: '/main',
    redirect: '/welcome',
    component: () => import('@/panel/layouts/defaultLayout.vue'),
    children: [{ path: '/welcome', component: () => import('@/panel/pages/welcome/index.vue') }],
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
