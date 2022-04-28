<template>
  <div className="radio__group">
    <div v-for="(field, key) in fields" :key="key">
      <input
        v-on="validationListeners"
        type="radio"
        :name="name"
        :value="value"
        @change="setValue(field.fieldValue)"
        required
      />
      <span className="radio__label">{{ field.label }}</span>
    </div>
  </div>
  <div className="field__error">{{ errorMessage }}</div>
</template>

<script>
import { computed, toRef } from "vue";
import { useField } from "vee-validate";
export default {
  name: "CustomRadioGroup",
  props: {
    fields: {
      fields: Array,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  setup(props) {
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
      setValue,
    };
  },
};
</script>
