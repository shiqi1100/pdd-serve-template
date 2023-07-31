import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";

import NProgress from "nprogress";
import type { RouteRecordRaw } from "vue-router";
import "nprogress/nprogress.css";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/birth",
    name: "birth",
    component: () => import("@/views/worker-birth/worker-birth.vue"),
  },
  {
    path: "/workerBook",
    name: "workerBook",
    component: () => import("@/views/address-book/address-book.vue"),
  },
];

export function initRouter() {
  const router = createRouter({
    history: window["__POWERED_BY_WUJIE__"] ? createWebHistory() : createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
      return savedPosition || { top: 0 };
    },
  });

  router.beforeEach(() => {
    NProgress.start();
  });

  router.afterEach(() => {
    NProgress.done();
  });

  return router;
}
