import { createRouter, createWebHistory } from "vue-router";
import { requiresAuth, requiresMyPets } from "./guard";
import ProfileView from "@/views/Profile";
import PetView from "@/views/Pet";
import MyPets from "@/views/Pet/MyPets";

const routes = [
  {
    path: "/session",
    name: "user",
    component: () => import("../views/User.vue"),
  },
  {
    path: "/",
    name: "ProfileView",
    component: ProfileView,
    meta: { requiresAuth: true },
    redirect: { name: "PetView" },
    beforeEnter: requiresAuth,
    children: [
      {
        path: ":userId",
        name: "PetView",
        props: true,
        component: PetView,
        redirect: { name: "MyPets" },
        children: [
          {
            path: "pets",
            name: "MyPets",
            props: true,
            component: MyPets,
            beforeEnter: requiresMyPets,
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
