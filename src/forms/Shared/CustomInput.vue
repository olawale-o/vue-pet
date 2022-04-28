<template>
  <div class="field">
    <input
      :type="type"
      :name="name"
      v-model="field"
      class="input"
      :placeholder="placeholder"
    />
    <span>{{ error }}</span>
  </div>
</template>

<script>
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
    const obj = useField(props.name);
    return {
      field: obj.value[props.name],
      error: obj.errorMessage[`${props.name}Error`],
    }
  },
};
</script>