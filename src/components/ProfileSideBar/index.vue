<template>
  <div class="profile__sidebar">
    <nav class="nav-container">
      <ul class="nav_list">
        <li class="nav_item">
          <router-link to="/" class="link nav_link">
            <span class="link_text">Notifications</span>
          </router-link>
        </li>
        <li class="nav_item">
          <router-link :to="`/${userId}/pets`" class="link nav_link">
            <span class="link_text">Pets</span>
          </router-link>
        </li>
        <li class="nav_item">
          <router-link :to="`/${userId}/pets/new`" class="link nav_link">
            <span class="link_text primary_link-text d-block text-center">
              Add Pet
            </span>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "ProfileSideBar",
  props: {
    userId: {
      type: Number,
    },
  },
  setup() {},
};
</script>
<style scoped>
@import "./style.css";
</style>
