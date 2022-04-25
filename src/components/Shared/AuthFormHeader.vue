<template>
  <h1>{{ title }}</h1>
  <div class="switch-buttons">
    <button
      type="button"
      class="button button-outline"
      :disabled="!focus"
      @click="activate"
    >
      Login
    </button>
    <button
      type="button"
      class="button button-outline"
      :disabled="focus"
      @click="activate"
    >
      Register
    </button>
  </div>
  <div class="continue-with">
    <button type="button" class="button button-social google w-100">
      Google
    </button>
    <button type="button" class="button button-social facebook w-100">
      Facebook
    </button>
  </div>
  <div class="or">
    <span class="left" />
    <span class="text">or</span>
    <span class="right" />
  </div>
</template>

<script>
import { inject } from "vue";
export default {
  name: "AuthFormHeader",
  emits: ["onReset"],
  props: {
    title: {
      type: String,
    },
    isFocus: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { isFocus, onActive } = inject("active");
    return {
      focus: isFocus,
      activate: onActive,
    }
  },
};
</script>
