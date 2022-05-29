<template>
  <div class="home">
    <div class="content">
      <div class="main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  setup() {},
};
</script>

<style scoped>
@import "./style.css";
</style>
