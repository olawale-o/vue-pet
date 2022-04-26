<template>
  <header class="header" v-if="user">
    <nav class="nav">
      <div class="logo">
        <router-link to="/" class="link logo_link">Paws</router-link>
      </div>
      <ul class="nav__list">
        <li class="nav__item">
          <router-link to="/" type="button" class="btn__link btn-login">
            Login
          </router-link>
        </li>
        <li class="nav__item">
          <router-link to="/" type="button" class="btn__link btn-login">
            Logout
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { inject } from "vue";
export default {
  name: "Navbar",
  setup() {
    const user = inject("user");
    return {
      user,
    };
  },
};
</script>

<style scoped>
@import "./style.css";
</style>
