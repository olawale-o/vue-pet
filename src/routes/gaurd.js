import useAuthUserStore from "@/store/auth";

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
