<template>
  <div className="profile__area">
    <div className="pets">
      <MyPetCard
        v-for="pet in pets"
        :key="pet.id"
        :pet="pet"
        :choosenPet="state.choosePet"
        @set-pet="onChoosePet"
        :modal="state.modal"
      />
    </div>
    <Teleport to="#overlay">
      <div
        v-if="state.overlay"
        class="overlay bg-transparent"
        :class="{'bg-dark z-index-2000': toDelete}"
        @click="close"
      />
    </Teleport>
    <DeleteModal v-if="state.toDelete" />
  </div>
</template>

<script>
import { reactive, provide } from "vue";
import MyPetCard from "@/components/MyPetCard";
import { DeleteModal } from "@/components/Shared";
export default {
  name: "ProfileArea",
  components: {
    MyPetCard,
    DeleteModal,
  },
  props: {
    pets: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const state = reactive({
      choosePet: 0,
      index: 0,
      modal: false,
      overlay: false,
      toDelete: false,
    });

    const onChoosePet = (petId) => {
      state.choosePet = petId;
      state.index = petId;
      state.overlay = !state.overlay;
    };

    const close = () => {
      state.overlay = !state.overlay;
      state.choosePet = 0;
    };

    const openModal = () => {
      state.overlay = !state.overlay;
      state.modal = !state.modal;
      state.choosePet = 0;
    };

    provide("edit", {
      openModal,
    });

    return {
      state,
      onChoosePet,
      close,
    };
  },
};
</script>

<style scoped>
@import "./style.css";
</style>
