import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/FundDashLayout.vue'),
    children: [
      { path: '', component: () => import('pages/PoolsDashPage.vue') },
    ],
  },
  {
    path: '/day',
    component: () => import('layouts/FundDashLayout.vue'),
    children: [
      {
        path: ':day',
        component: () => import('pages/PoolsDayDataPage.vue'),
      },
    ],
  },
  {
    path: '/hour',
    component: () => import('layouts/FundDashLayout.vue'),
    children: [
      {
        path: ':hour',
        component: () => import('pages/PoolsHourDataPage.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
