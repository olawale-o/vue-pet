<template>
  <div v-if="shouldShow">
    <slot />
  </div>
</template>

<script>
import { inject, computed } from "vue";
export default {
  name: "FormStep",
  setup() {
    const currentIdx = inject("STEP_COUNTER").value++;
    const formStepIdx = inject("CURRENT_STEP_INDEX");

    const shouldShow = computed(() => {
      return currentIdx === formStepIdx.value;
    });

    return {
      shouldShow,
    };
  },
};
</script>
