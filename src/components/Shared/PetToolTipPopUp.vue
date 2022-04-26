<template>
  <ToolTipPopUp>
    <ToolTipItem>
      <PetActionButton @on-action="onDelete">
        Delete
      </PetActionButton>
    </ToolTipItem>
    <ToolTipItem>
      <PetActionButton @on-action="openModal">
        Edit
      </PetActionButton>
    </ToolTipItem>
  </ToolTipPopUp>
</template>

<script>
import { PetActionButton, ToolTipItem, ToolTipPopUp } from "@/components/slots";
export default {
  name: "PetToolTipPopUp",
  components: {
    PetActionButton,
    ToolTipItem,
    ToolTipPopUp,
  },
  setup() {
    return {
      onDelete: () => {
        console.log('delete');
      },
      openModal: () => {
        console.log('open modal');
      },
    }
  },
}
</script>