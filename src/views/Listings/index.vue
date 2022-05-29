<template>
  <div>
    <SideSearchPanel />
  </div>
</template>

<script>
import { provide, reactive } from "vue";
import { genders, breedTypes, petColors } from "@/constants";
import SideSearchPanel from "@/components/SideSearchPanel";
export default {
  name: "ListingView",
  components: {
    SideSearchPanel,
  },
  setup() {
    const fieldState = reactive({
      gender: "b",
      breed: "both",
      color: "",
    });
    const onGenderSelected = (value) => {
      fieldState.gender = value;
    };
  
    const onBreedSelected = (value) => {
      fieldState.breed = value;
    };
    const onColorSelected = (value) => {
      fieldState.color = value;
    };
    provide("sideParams", {
      fieldState,
      genders,
      breedTypes,
      petColors,
      onColorSelected,
      onGenderSelected,
      onBreedSelected,
    });
    return {};
  },
};
</script>
