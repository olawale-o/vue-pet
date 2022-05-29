import { defineStore } from "pinia";

import {
  normalizeMyPets,
  normalizePhotos,
  normalizeAllPets,
} from "../../Schema/normalizers";

const usePetStore = defineStore({
  id: "pet",
  state: () => ({
    myPets: null,
    allPets: null,
    selectedPet: null,
    breeds: null,
    loading: false,
    error: null,
    photos: [],
    petIds: [],
    searchMeta: {},
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

    updatePhotos(payload) {
      this.photos = payload;
    },

    updatePhoto(payload) {
      const myPets = this.myPets;
      const allPets = this.allPets;
      myPets[payload.id].pic_url = payload.pic_url;
      allPets[payload.id].pic_url = payload.pic_url;
      this.myPets = myPets;
      this.allPets = allPets;
    },

    updateAllPets(payload) {
      this.searchMeta = payload.meta;
      this.allPets = payload.pets;
      this.petIds = payload.petIds;
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

    async getSelectedPet(credential) {
      this.loading = !this.loading;
      try {
        this.updateSelectedPet(credential);
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
    async setProfilePhoto(credential, service, cb) {
      this.loading = !this.loading;
      try {
        const {
          data: { dog },
        } = await service(credential);
        this.updatePhoto(dog);
        cb(-1);
      } catch (e) {
        console.log(e);
        this.error = e.response.data.error;
      } finally {
        this.loading = !this.loading;
      }
    },

    async getAllPets(service, credential) {
      this.loading = !this.loading;
      try {
        const {
          data: { dogs, result_metadata: meta },
        } = await service(credential);
        const { pets, petIds } = normalizeAllPets(dogs);
        this.updateAllPets({ pets, petIds, meta });
      } catch (e) {
        this.error = e.response.data.error;
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
