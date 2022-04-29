<template>
  <div ref="el" class="search__input" :class="{ active: isVisible }">
    <input
      v-on="validationListeners"
      type="text"
      :name="name"
      :placeholder="placeholder"
      @input="onChange"
      :value="value"
      autoComplete="off"
      @focus="$emit('onFocus')"
    />
    <span class="field__error">{{ errorMessage }}</span>
    <ul class="match__box">
      <li v-for="(item, key) in list" :key="key">
        <button type="button" @click="onChoose(item)">
          {{ item.name }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { useField } from "vee-validate";
import { toRef } from "vue";
import { useValidationListeners } from "@/composables/useValidationListeners";
export default {
  name: "CustomAutoSuggest",
  emits: ["onSearch", "onSelected", "onFocus"],
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    list: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { value, errorMessage, handleChange, setValue } = useField(
      toRef(props, "name"),
      undefined,
      { validateOnValueUpdate: false }
    );
    // const validationListeners = computed(() => {
    //   if (!errorMessage.value) {
    //     return {
    //       blur: handleChange,
    //       change: handleChange,
    //       input: (e) => handleChange(e, false),
    //     };
    //   }
    //   return {
    //     blur: handleChange,
    //     change: handleChange,
    //     input: handleChange,
    //   };
    // });
    const validationListeners = useValidationListeners(errorMessage, handleChange);
    return {
      value,
      errorMessage,
      handleChange,
      validationListeners,
      onChange: (e) => {
        setValue(e.target.value);
        emit("onSearch", e.target.value);
      },
      onChoose: (item) => {
        setValue(item.name);
        emit("onSelected", false);
      },
    };
  },
};
</script>
