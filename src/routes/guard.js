import useAuthUserStore from "@/store/auth";
import usePetStore from "@/store/pet";
import { myDogService, getPetPhotosService } from "@/services";

export const requiresAuth = (to, from, next) => {
  const store = useAuthUserStore();
  const currentUser = store.currentUser;
  if (!currentUser) {
    next({
      path: "/session",
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
      path: "/",
    });
  } else {
    next();
  }
};

export const requiresMyPets = (to, from, next) => {
  const store = useAuthUserStore();
  const currentUser = store.currentUser;
  const petStore = usePetStore();
  petStore
    .getMyPets(currentUser.id, myDogService)
    .then(() => {
      next();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const requiresPetPhotos = (to, from, next) => {
  const petStore = usePetStore();
  petStore.getPhotos({ petId: to.params.petId }, getPetPhotosService);
  next();
};
