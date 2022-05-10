<template>
  <PhotoList :photos="photos" />
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import usePetStore from "@/store/pet";
import PhotoList from "@/components/Pet/PhotoList";
export default {
  name: "PhotosView",
  components: {
    PhotoList,
  },
  setup() {
    const route = useRoute();
    const photos = ref();
    const { myPets } = storeToRefs(usePetStore());
    photos.value = myPets.value[String(route.params.petId)].images;
    return {
      photos,
    };
  },
};
</script>
