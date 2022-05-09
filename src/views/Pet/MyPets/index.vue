<template>
  <ProfileArea :pets="pets" />
</template>

<script>
import { storeToRefs } from "pinia";
import usePetStore from "@/store/pet";
import { ProfileArea } from "@/components";
export default {
  name: "MyPets",
  components: {
    ProfileArea,
  },
  setup() {
    const { petIds, loading } = storeToRefs(usePetStore());
    return {
      pets: petIds,
      loading,
    };
  },
};
</script>
