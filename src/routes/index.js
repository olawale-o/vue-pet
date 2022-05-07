import { createRouter, createWebHistory } from "vue-router";
import { requiresAuth, requiresMyPets, requiresPetPhotos } from "./guard";
import ProfileView from "@/views/Profile";
import PetView from "@/views/Pet";
import MyPets from "@/views/Pet/MyPets";
import NewPet from "@/views/Pet/NewPet";
import Photos from "@/views/Pet/Photos";

const routes = [
  {
    path: "/session",
    name: "user",
    component: () => import("../views/User.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home"),
  },
  {
    path: "/:userId",
    name: "ProfileView",
    component: ProfileView,
    meta: { requiresAuth: true },
    redirect: { name: "MyPets" },
    beforeEnter: requiresAuth,
    children: [
      {
        path: "pets",
        name: "PetView",
        component: PetView,
        children: [
          {
            path: "",
            name: "MyPets",
            component: MyPets,
            props: true,
            beforeEnter: requiresMyPets,
          },
          {
            path: ":petId/photos",
            name: "Photos",
            component: Photos,
            props: true,
            beforeEnter: requiresPetPhotos,
          },
          {
            path: "new",
            name: "NewPet",
            component: NewPet,
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
