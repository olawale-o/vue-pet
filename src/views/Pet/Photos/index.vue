<template>
  <PhotoList :photos="photos" />
</template>

<script>
import { storeToRefs } from "pinia";
import usePetStore from "@/store/pet";
import PhotoList from "@/components/Pet/PhotoList";
export default {
  name: "PhotosView",
  components: {
    PhotoList,
  },
  setup() {
    const { photos } = storeToRefs(usePetStore());
    return {
      photos,
    };
  },
};
</script>