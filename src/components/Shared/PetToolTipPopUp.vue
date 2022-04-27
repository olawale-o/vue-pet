<template>
  <ToolTipPopUp>
    <ToolTipItem>
      <PetActionButton @on-action="onDelete">
        Delete
      </PetActionButton>
    </ToolTipItem>
    <ToolTipItem>
      <PetActionButton @on-action="onModalOpen">
        Edit
      </PetActionButton>
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
  setup() {
    const { openModal } = inject("edit");
    return {
      onDelete: () => {
        console.log('delete');
      },
      onModalOpen: () => {
        openModal();
      },
    }
  },
}
</script>