import { defineStore } from "pinia";

const useRootStore = defineStore({
  id: "root",
  state: () => {
    return {
      loading: false,
      error: null,
      token: null,
      user: null,
    };
  },
  getters: {
    currentUser: (state) => state.user,
    isLoading: (state) => state.loading,
    currentError: (state) => state.error,
    currentToken: (state) => state.token,
  },
  actions: {
    setLoading() {
      this.loading = !this.loading;
    },
    setError(payload) {
      this.error = payload;
    },
    setToken(payload) {
      this.token = payload;
    },
    reset() {
      this.$reset();
    },
    updateUser(payload) {
      this.user = payload;
    },
    updateField(payload) {
      this.user = { ...this.user, ...payload };
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "root",
        storage: localStorage,
      },
    ],
  },
});

export default useRootStore;
