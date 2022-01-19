import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "user",
    component: () => import("../views/User.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
