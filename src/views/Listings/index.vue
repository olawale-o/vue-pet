<template>
  <div>
    <SideSearchPanel />
  </div>
</template>

<script>
import { provide, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { genders, breedTypes, petColors } from "@/constants";
import SideSearchPanel from "@/components/SideSearchPanel";
export default {
  name: "ListingView",
  components: {
    SideSearchPanel,
  },
  setup() {
    const router = useRouter();
    const fieldState = reactive({
      gender: "b",
      breed: "both",
      color: "all",
    });

    const onGenderSelected = (value) => {
      fieldState.gender = value;
      router.replace({
        query: {
          gender: value,
          breeder: fieldState.breed,
          color: fieldState.color,
        },
      });
    };

    const onBreedSelected = (value) => {
      fieldState.breed = value;
      router.replace({
        query: {
          gender: fieldState.gender,
          breeder: value,
          color: fieldState.color,
        },
      });
    };
    const onColorSelected = (value) => {
      fieldState.color = value;
      router.replace({
        query: {
          gender: fieldState.gender,
          breeder: fieldState.breed,
          color: value,
        },
      });
    };

    onMounted(() => {
      router.replace({
        path: "/listing",
        query: {
          gender: fieldState.gender,
          breeder: fieldState.breed,
          color: "all",
        },
      });
    });

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
