<template>
  <div class="photo__list">
    <div className="photo" :key="index" v-for="(photo, index) in photos">
      <img :src="`${BASE_URI}${photo.url}`" alt="dog" />
      <button type="button" className="photo__btn">
        <font-awesome-icon icon="pen" class="icon" color="#fff" />
      </button>
    </div>
  </div>
</template>

<script>
import BASE_URI from "@/constants";
export default {
  name: "PhotoList",
  props: {
    photos: {
      type: Array,
      required: true,
    },
  },
  setup() {
    return {
      BASE_URI,
    };
  },
};
</script>
<style scoped>
@import "./style.css";
</style>
