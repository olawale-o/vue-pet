<template>
  <div class="app">
    <Navbar />
    <router-view />
  </div>
</template>
<script>
import { provide } from "vue";
import { storeToRefs } from "pinia";
import useUserAuthStore from "./store/auth";
import Navbar from "./components/Navbar";
export default {
  name: "App",
  components: {
    Navbar,
  },
  setup() {
    const { user } = storeToRefs(useUserAuthStore());
    provide("user", user);
  },
};
</script>
<style></style>
