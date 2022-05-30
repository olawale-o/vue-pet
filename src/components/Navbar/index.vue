<template>
  <header class="header">
    <nav class="nav">
      <div class="logo">
        <router-link to="/" class="link logo_link">Paws</router-link>
      </div>
      <ul className="option__list sm">
        <li className="option">
          <button type="button" class="option__button bookmark">
            <span>
              <font-awesome-icon icon="bars" class="icon" />
            </span>
          </button>
        </li>
      </ul>
      <ul class="nav__list lg">
        <template v-if="user">
          <li className="nav__item">
            <router-link
              :to="`/${user.id}/pets`"
              type="button"
              class="btn__link my-pet"
            >
              My Pets
            </router-link>
          </li>
          <li class="nav__item">
            <router-link to="/" type="button" class="btn__link btn-login">
              Logout
            </router-link>
          </li>
        </template>
      </ul>
    </nav>
  </header>
</template>

<script>
import { inject } from "vue";
export default {
  name: "Navbar",
  setup() {
    const { user } = inject("global");
    return {
      user,
    };
  },
};
</script>

<style scoped>
@import "./style.css";
</style>
