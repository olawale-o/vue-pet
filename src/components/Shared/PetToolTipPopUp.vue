<template>
  <ToolTipPopUp>
    <ToolTipItem>
      <PetActionButton @on-action="onPetDelete(petNumber)">Delete</PetActionButton>
    </ToolTipItem>
    <ToolTipItem>
      <PetActionButton @on-action="onModalOpen">Edit</PetActionButton>
    </ToolTipItem>
    <ToolTipItem>
      <PetActionButton @on-action="onPetPhoto(petNumber)">Photos</PetActionButton>
    </ToolTipItem>
  </ToolTipPopUp>
</template>

<script>
import { inject } from "vue";
import { PetActionButton, ToolTipItem, ToolTipPopUp } from "@/components/slots";
export default {
  name: "PetToolTipPopUp",
  components: {
    PetActionButton,
    ToolTipItem,
    ToolTipPopUp,
  },
  props: {
    petNumber: {
      type: Number,
      required: true,
    },
  },
  setup() {
    const { openModal, onPetDelete, onPetPhoto } = inject("edit");
    return {
      onPetDelete,
      onPetPhoto,
      onModalOpen: () => {
        openModal();
      },
    };
  },
};
</script>
