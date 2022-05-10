import { defineStore } from "pinia";

import { normalizeMyPets, normalizePhotos } from "../../Schema/normalizers";

const usePetStore = defineStore({
  id: "pet",
  state: () => ({
    myPets: [],
    allPets: [],
    selectedPet: null,
    breeds: null,
    loading: false,
    error: null,
    photos: [],
    petIds: [],
  }),

  actions: {
    updatePets(payload) {
      this.myPets = this.myPets.concat(payload);
    },

    updateMyPets(payload) {
      this.myPets = payload.pets;
      this.photos = payload.photos;
      this.petIds = payload.petIds;
    },

    updateSelectedPet(payload) {
      this.selectedPet = payload;
    },

    updateBreeds(payload) {
      this.breeds = payload;
    },

    updateAllPets(payload) {
      this.allPets = payload;
    },

    updatePhotos(payload) {
      this.photos = payload;
    },

    async createPet(data, service, push) {
      this.loading = !this.loading;
      try {
        const {
          data: { dog },
        } = await service(data);
        this.updatePets(dog);
        push(`/${dog.owner_id}/pets`);
      } catch (error) {
        this.error = error.response.data.error;
      } finally {
        this.loading = !this.loading;
      }
    },

    async getMyPets(credentials, service) {
      // if (this.myPets) {
      //   return true;
      // }
      this.loading = !this.loading;
      try {
        return service(credentials).then(
          ({
            data: {
              owner: { dogs },
            },
          }) => {
            const { pets, petIds, photos } = normalizeMyPets(dogs);
            this.updateMyPets({ pets, petIds, photos });
            this.loading = !this.loading;
            return true;
          }
        );
      } catch (error) {
        this.error = error.response.data.error;
        this.loading = !this.loading;
      }
    },

    async getSelectedPet(credential, service) {
      this.loading = !this.loading;
      try {
        const {
          data: { dog },
        } = await service(credential);
        this.updateSelectedPet(dog);
      } catch (error) {
        this.error = error.response.data.error;
      } finally {
        this.loading = !this.loading;
      }
    },

    async getBreeds(service) {
      this.loading = !this.loading;
      try {
        const {
          data: { breeds },
        } = await service();
        this.updateBreeds(breeds);
      } catch (error) {
        this.error = error.response.data.error;
      } finally {
        this.loading = !this.loading;
      }
    },

    async getAllPets(service) {
      this.loading = !this.loading;
      try {
        const {
          data: { dogs },
        } = await service();
        this.updateAllPets(dogs);
      } catch (error) {
        this.error = error.response.data.error;
      } finally {
        this.loading = !this.loading;
      }
    },

    async getPhotos(credentials, service) {
      this.loading = !this.loading;
      try {
        const {
          data: { photos },
        } = await service(credentials);
        const images = normalizePhotos(photos);
        this.updatePhotos(images);
      } catch (error) {
        this.error = error.response.data.error;
      } finally {
        this.loading = !this.loading;
      }
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "pet",
        storage: localStorage,
      },
    ],
  },
});

export default usePetStore;
