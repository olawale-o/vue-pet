<template>
  <button
    type="button"
    className="action__btn"
    @click="$emit('onAction')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  emits: ["onAction"],
  setup() {},
}
</script>