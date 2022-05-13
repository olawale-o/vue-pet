<template>
  <div class="photo__list">
    <Photo :key="index" v-for="(photo, index) in photos" :photoId="photo" />
  </div>
</template>

<script>
import { provide } from "vue";
import Photo from "../Photo";
import BASE_URI from "@/constants";
export default {
  name: "PhotoList",
  props: {
    photos: {
      type: Array,
      required: true,
    },
  },
  components: {
    Photo,
  },
  setup() {
    provide("edit", {});
    return {
      BASE_URI,
    };
  },
};
</script>
<style scoped>
@import "./style.css";
</style>
