<template>
  <div>
    <SideSearchPanel />
    <PetListing :petIds="petIds" />
  </div>
</template>

<script>
import { provide, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import usePetStore from "@/store/pet";
import { storeToRefs } from "pinia";
import { genders, breedTypes, petColors } from "@/constants";
import SideSearchPanel from "@/components/SideSearchPanel";
import PetListing from "@/components/PetListing";
import { allDogService } from "@/services";
export default {
  name: "ListingView",
  components: {
    SideSearchPanel,
    PetListing,
  },
  setup() {
    const router = useRouter();
    const fieldState = reactive({
      gender: "b",
      breed: "both",
      color: "all",
    });

    const paginationData = reactive({
      page: 0,
      direction: "next",
    });

    const petStore = usePetStore();

    const { petIds, searchMeta } = storeToRefs(usePetStore());

    const paginate = (page, direction) => {
      petStore.getAllPets(allDogService, {
        page,
        gender: fieldState.gender,
        direction,
      });
      paginationData.page = page;
      paginationData.direction = direction;
    };

    const onGenderSelected = (value) => {
      fieldState.gender = value;
      router.replace({
        query: {
          gender: value,
          breeder: fieldState.breed,
          color: fieldState.color,
        },
      });
      petStore.getAllPets(allDogService, {
        page: paginationData.page,
        gender: value,
        direction: paginationData.direction,
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
      paginate,
      searchMeta,
    });
    return {
      petIds,
    };
  },
};
</script>
