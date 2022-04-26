import { defineStore } from "pinia";

const useAuthUserStore = defineStore({
  id: 'auth/user',
  state: () => ({
    user: null,
    loading: false,
    error: null,
  }),
  getters: {
    currentUser: (state) => state.user,
  },
  actions: {
    updateUser(payload) {
      this.user = { ...this.user, ...payload };
    },

    async login(credentials, service, cb) {
      try {
        this.loading = !this.loading;
        const response = await service(credentials);
        this.updateUser(response);
        cb('/');
      } catch (error) {
        this.error = error.response.data.error;
      } finally {
        this.loading = !this.loading;
      }
    },

    async register(credentials, service, cb) {
      this.loading = !this.loading;
      try {
        const response = await service(credentials);
        this.updateUser(response);
        cb('/');
      } catch (error) {
        this.error = error.response.data.error;
      } finally {
        this.loading = !this.loading;
      }
    },

    async logOut(service) {
      this.loading = !this.loading;
      try {
        return service()
        .then(() => {
          this.$reset();
        }).catch((error) => {
          this.error = error.message;
        });
      } catch(e) {
        this.error = e.message;
      } finally {
        this.loading = !this.loading;
      }

    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "auth",
        storage: localStorage,
      }
    ]
  },
});

export default useAuthUserStore;
