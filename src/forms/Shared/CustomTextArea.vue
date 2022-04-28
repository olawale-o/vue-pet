<template>
  <div class="field">
    <textarea
      v-on="validationListeners"
      :type="type"
      :name="name"
      class="textarea"
      :placeholder="placeholder"
      :value="value"
      rows="10"
    />
    <span class="field__error">{{ errorMessage }}</span>
  </div>
</template>

<script>
import { computed } from "vue";
import { useField } from "vee-validate";
export default {
  name: "CustomInput",
  props: {
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      default: "text",
    },
  },
  setup(props) {
    const { value, errorMessage, handleChange } = useField(props.name, undefined, {
      validateOnValueUpdate: false,
    });
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
    };
  },
};
</script>
