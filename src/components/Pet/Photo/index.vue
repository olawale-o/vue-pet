<template>
  <div className="photo">
    <img :src="`${BASE_URI}${photo.url}`" alt="dog" />
    <button type="button" className="photo__btn">
      <font-awesome-icon icon="pen" class="icon" color="#fff" />
    </button>
  </div>
</template>

<script>
import BASE_URI from "@/constants";
import { computed } from "vue";
import { storeToRefs } from "pinia";
import usePetStore from "@/store/pet";
export default {
  name: "Photo",
  props: {
    photoId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { photos } = storeToRefs(usePetStore());
    const photo = computed(() => photos.value[String(props.photoId)]);
    return {
      BASE_URI,
      photo,
    };
  },
};
</script>
