<template>
  <div class="range">
    <div class="range__value">
      <span ref="el">{{ value }}</span>
    </div>
    <div class="range__field">
      <div class="value left">0</div>
      <input
        type="range"
        :name="name"
        :value="value"
        min="0"
        max="200"
        steps="1"
        @change="onSliderChange"
        @blur="$emit('onSliderBlur')"
      />
      <div class="value right">200</div>
    </div>
  </div>
  <div class="field__error">{{ errorMessage }}</div>
</template>

<script>
import { computed, toRef } from "vue";
import { useField } from "vee-validate";
export default {
  name: "CustomSlider",
  emits: ["onSliderMove", "onSliderBlur"],
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { value, errorMessage, handleChange, setValue } = useField(
      toRef(props, "name"),
      undefined,
      { validateOnValueUpdate: false }
    );
    const validationListeners = computed(() => {
      if (!errorMessage.value) {
        return {
          blur: handleChange,
          change: handleChange,
          input: (e) => handleChange(e, false),
        };
      }
      return {
        blur: handleChange,
        change: handleChange,
        input: handleChange,
      };
    });
    return {
      value,
      errorMessage,
      handleChange,
      validationListeners,
      onSliderChange: (e) => {
        const {
          target: { value },
        } = e;
        setValue(value);
        emit("onSliderMove", value);
      },
    };
  },
};
</script>
