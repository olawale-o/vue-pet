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

    onMounted(() => {
      router.replace({
        path: "/listing",
        query: {
          gender: 'b',
          breeder: 'b',
          color: 'all',
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
