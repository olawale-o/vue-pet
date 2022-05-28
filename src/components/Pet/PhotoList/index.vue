<template>
  <div class="photo__list">
    <Photo
      :key="index"
      v-for="(photo, index) in photos"
      :photoId="photo"
      :choosenPhoto="state.choosenPhoto"
      @set-photo="setPhoto"
    />
    <Teleport to="#overlay">
      <div
        v-if="state.overlay"
        class="overlay"
        :class="{ ' bg-dark z-index-2000 ': state.fullOverlay }"
        @click="close"
      />
    </Teleport>
  </div>
</template>

<script>
import { reactive } from "vue";
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
    const state = reactive({
      choosenPhoto: 0,
      overlay: false,
      fullOverlay: false,
    });

    const setPhoto = (photoId) => {
      state.choosenPhoto = photoId;
      state.overlay = !state.overlay;
    };

    const close = () => {
      state.overlay = !state.overlay;
      state.choosenPhoto = 0;
      state.fullOverlay = false;
    };
    return {
      BASE_URI,
      state,
      setPhoto,
      close,
    };
  },
};
</script>
<style scoped>
@import "./style.css";
</style>
