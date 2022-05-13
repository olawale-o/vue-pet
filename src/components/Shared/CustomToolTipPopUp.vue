<template>
  <ToolTipPopUp>
    <slot></slot>
  </ToolTipPopUp>
</template>

<script>
import { ToolTipPopUp } from "@/components/slots";
export default {
  name: "CustomToolTipPopUp",
  components: {
    ToolTipPopUp,
  },
  setup() {
    return {};
  },
};
</script>
