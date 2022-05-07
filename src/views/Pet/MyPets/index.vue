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
    const { myPets } = storeToRefs(usePetStore());
    return {
      pets: myPets,
    };
  },
};
</script>
