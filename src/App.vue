<template>
  <div class="app">
    <Navbar />
    <router-view />
  </div>
</template>
<script>
import { provide, onMounted } from "vue";
import { storeToRefs } from "pinia";
import useUserAuthStore from "./store/auth";
import usePetStore from "./store/pet";
import Navbar from "./components/Navbar";
import { getDogBreedsService } from "./services";
export default {
  name: "App",
  components: {
    Navbar,
  },
  setup() {
    const petStore = usePetStore();
    const { user } = storeToRefs(useUserAuthStore());
    const { breeds } = storeToRefs(usePetStore());
    provide("global", {
      user,
      breeds,
    });

    onMounted(() => petStore.getBreeds(getDogBreedsService));
  },
};
</script>
<style></style>
