import { defineStore } from "pinia";

const usePetStore = defineStore({
  id: 'pet',
  state: () => ({
    myPets: [],
    allPets: [],
    selectedPet: null,
    breeds: null,
    loading: false,
    error: null,
  }),
  actions: {
    updatePets(payload) {
      this.myPets = this.myPets.concat(payload);
    },

    updateMyPets(payload) {
      this.myPets = payload;
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

    async createPet(data, service, push) {
      this.loading = !this.loading;
      try {
        const { data: { dog } } = await service(data);
        this.updatePets(dog);
        push(`/${dog.owner_id}/pets`);
      } catch (error) {
        this.error = error.response.data.error;
      } finally {
        this.loading = !this.loading;
      }
    },

    async getMyPets(service) {
      this.loading = !this.loading;
      try {
        const { data: { dogs } } = await service();
        this.updateMyPets(dogs);
      } catch (error) {
        this.error = error.response.data.error;
      } finally {
        this.loading = !this.loading;
      }
    },

    async getSelectePet(credential, service) {
      this.loading = !this.loading;
      try {
        const { data: { dog } } = await service(credential);
        this.updateSelectedPet(dog);
      } catch (error) {
        this.error = error.response.data.error;
      } finally {
        this.loading = !this.loading;
      }
    },
  },

  async getBreeds(service) {
    this.loading = !this.loading;
    try {
      const { data: { breeds } } = await service();
      this.updateBreeds(breeds);
    } catch(error) {
      this.error = error.response.data.error
    } finally {
      this.loading = !this.loading;
    }
  },

  async getAllPets(service) {
    this.loading = !this.loading;
    try {
      const { data: { dogs } } = await service();
      this.updateAllPets(dogs);
    } catch(error) {
      this.error = error.response.data.error;
    } finally {
      this.loading = !this.loading;
    }
  }
});

export default usePetStore;
