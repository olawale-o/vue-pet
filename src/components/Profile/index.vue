<template>
  <div class="profile__area">
    <!-- <div class="loading fixed" v-if="loading" /> -->
    <div class="pets">
      <MyPetCard
        v-for="(pet, index) in pets"
        :key="index"
        :petId="pet"
        :choosenPet="state.choosePet"
        @set-pet="onChoosePet"
        :modal="state.modal"
      />
    </div>
    <Teleport to="#modals" v-if="state.modal">
      <UpdatePetForm @close="closePopUp" />
    </Teleport>
    <Teleport to="#overlay">
      <div
        v-if="state.overlay"
        class="overlay"
        :class="{ ' bg-dark z-index-2000 ': state.fullOverlay }"
        @click="close"
      />
    </Teleport>
    <DeleteModal v-if="state.toDelete" />
  </div>
</template>

<script>
import { reactive, provide, inject, defineAsyncComponent } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import MyPetCard from "@/components/MyPetCard";
import usePetStore from "@/store/pet";
export default {
  name: "ProfileArea",
  components: {
    MyPetCard,
    DeleteModal: defineAsyncComponent(() =>
      import("@/components/Shared/DeleteModal")
    ),
    UpdatePetForm: defineAsyncComponent(() =>
      import("@/components/Pet/UpdatePetForm")
    ),
  },
  props: {
    pets: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const petStore = usePetStore();
    const { loading, myPets } = storeToRefs(usePetStore());
    const {
      user: {
        value: { id },
      },
    } = inject("global");
    const router = useRouter();
    const state = reactive({
      choosePet: 0,
      index: 0,
      modal: false,
      overlay: false,
      fullOverlay: false,
    });

    const onChoosePet = (petId) => {
      state.choosePet = petId;
      state.index = petId;
      state.overlay = !state.overlay;
    };

    const close = () => {
      state.overlay = !state.overlay;
      state.choosePet = 0;
      state.fullOverlay = false;
    };

    const openModal = () => {
      const pet = myPets.value[state.index];
      petStore.getSelectedPet(pet);
      state.overlay = !state.overlay;
      state.modal = !state.modal;
      state.choosePet = 0;
      document.body.style.overflow = "hidden";
    };

    const onPetDelete = (petId) => {
      console.log("delete", petId);
      state.fullOverlay = !state.toDelete;
      state.choosePet = 0;
    };

    const onPetPhoto = (petId) => {
      router.push(`/${id}/pets/${petId}/photos`);
    };

    const closePopUp = () => {
      document.body.removeAttribute("style");
      state.modal = !state.modal;
    };

    provide("edit", {
      openModal,
      onPetDelete,
      onPetPhoto,
    });

    return {
      state,
      onChoosePet,
      close,
      closePopUp,
      loading,
    };
  },
};
</script>

<style scoped>
@import "./style.css";
</style>
