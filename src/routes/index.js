import { createRouter, createWebHistory } from "vue-router";
import {
  requiresAuth,
  requiresGuest,
  requiresMyPets,
  requiresPetPhotos,
} from "./guard";
import ProfileView from "@/views/Profile";
import PetView from "@/views/Pet";
import MyPets from "@/views/Pet/MyPets";
import NewPet from "@/views/Pet/NewPet";
import Photos from "@/views/Pet/Photos";
import Listings from "@/views/Listings";

const routes = [
  {
    path: "/session",
    name: "user",
    component: () => import("../views/User.vue"),
    beforeEnter: requiresGuest,
  },
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home"),
    beforeEnter: requiresAuth,
    children: [
      {
        path: " ",
        name: "Listings",
        redirect: { name: "Listings" },
        component: () => import("@/views/Listings"),
      },
      {
        path: "listing",
        name: "Listings",
        component: Listings,
      },
    ],
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
