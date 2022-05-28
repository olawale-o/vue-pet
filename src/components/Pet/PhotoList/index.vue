<template>
  <div class="photo__list">
    <Photo
      :key="index"
      v-for="(photo, index) in photos"
      :photoId="photo"
      :choosenPhoto="state.choosenPhoto"
      @set-photo="setPhoto"
      @make-profile-photo="makeProfilePhoto"
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
import { useRoute, useRouter } from "vue-router";
import Photo from "../Photo";
import BASE_URI from "@/constants";
import { setProfilePhotoService } from "@/services";
import usePetStore from "@/store/pet";
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
    const {
      params: { petId },
    } = useRoute();
    const router = useRouter();
    const petStore = usePetStore();
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
    const makeProfilePhoto = (url) => {
      state.choosenPhoto = 0;
      state.overlay = false;
      state.fullOverlay = false;
      petStore.setProfilePhoto(
        { petId, photo: { url } },
        setProfilePhotoService,
        router.go
      );
    };
    return {
      BASE_URI,
      state,
      setPhoto,
      close,
      makeProfilePhoto,
    };
  },
};
</script>
<style scoped>
@import "./style.css";
</style>
