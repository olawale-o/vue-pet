<template>
  <div class="profile__area">
    <div class="pets">
      <MyPetCard
        v-for="pet in pets"
        :key="pet.id"
        :pet="{
          id: pet.id,
          name: pet.name,
          offerCount: 2,
          likeCount: 5,
          color: pet.color,
          gender: pet.gender,
          image: pet.images[0].url,
        }"
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
        :class="{ ' bg-dark z-index-2000 ': state.toDelete }"
        @click="close"
      />
    </Teleport>
    <DeleteModal v-if="state.toDelete" />
  </div>
</template>

<script>
import { reactive, provide, inject } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import MyPetCard from "@/components/MyPetCard";
import { DeleteModal } from "@/components/Shared";
import UpdatePetForm from "@/components/Pet/UpdatePetForm";
import { getSelectedPetService } from "@/services";
import usePetStore from "@/store/pet";
export default {
  name: "ProfileArea",
  components: {
    MyPetCard,
    DeleteModal,
    UpdatePetForm,
  },
  props: {
    pets: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const petStore = usePetStore();
    const { loading } = storeToRefs(usePetStore());
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
      state.toDelete = false;
    };

    const openModal = async () => {
      await petStore.getSelectedPet(
        { petId: state.index, userId: id },
        getSelectedPetService
      );
      state.overlay = !state.overlay;
      state.modal = !state.modal;
      state.choosePet = 0;
      document.body.style.overflow = "hidden";
    };

    const onPetDelete = (petId) => {
      console.log("delete", petId);
      state.toDelete = !state.toDelete;
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
