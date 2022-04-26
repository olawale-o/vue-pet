import useAuthUserStore from "@/store/auth";
import { myDogService  } from "@/services";

export const requiresAuth = (to, from, next) => {
  const store = useAuthUserStore();
  const currentUser = store.currentUser;
  if (!currentUser) {
    next({
      path: '/session',
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
};

export const requiresGuest = (to, from, next) => {
  const store = useAuthUserStore();
  const currentUser = store.currentUser;
  if (currentUser) {
    next({
      path: '/',
    });
  } else {
    next();
  }
};

export const requiresMyPets = (to, from, next) => {
  const userAuthStore = useAuthUserStore();
  const currentUser = userAuthStore.currentUser;
  const usePetStore = usePetStore();
  usePetStore.getMyPets(myDogService(currentUser.id));
  next();
};
