<template>
  <button type="button" className="action__btn" @click="$emit('onAction')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "PetActionButton",
  emits: ["onAction"],
  setup() {},
};
</script>
