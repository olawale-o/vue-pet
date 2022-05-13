<template>
  <button type="button" class="action__btn" @click="$emit('onAction')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "ToolTipButton",
  emits: ["onAction"],
  setup() {},
};
</script>
