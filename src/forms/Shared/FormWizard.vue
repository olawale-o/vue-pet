<template>
  <form @submit="onSubmit">
    <slot />
    <div class="actions">
      <button
        type="submit"
        class="btn btn__secondary"
        @click="goToPrev"
        v-if="hasPrevious"
      >
        Back
      </button>
      <button type="submit" class="btn btn__primary">
        {{ isLastStep ? "Create" : "Next" }}
      </button>
    </div>
  </form>
</template>

<script>
import { useForm } from "vee-validate";
import { ref, provide, computed } from "vue";
export default {
  name: "FormWizard",
  props: {
    validationSchema: {
      type: Array,
      required: true,
    },
    initialValues: {
      type: Object,
      required: false,
    },
  },
  setup(props, { emit }) {
    const formData = ref({});
    const currentStepIdx = ref(0);
    const stepCounter = ref(0);
    provide("STEP_COUNTER", stepCounter);

    provide("CURRENT_STEP_INDEX", currentStepIdx);

    const isLastStep = computed(() => {
      return currentStepIdx.value === stepCounter.value - 1;
    });
    const hasPrevious = computed(() => {
      return currentStepIdx.value > 0;
    });
    const currentSchema = computed(() => {
      return props.validationSchema[currentStepIdx.value];
    });

    const { resetForm, handleSubmit } = useForm({
      validationSchema: currentSchema,
      initialValues: props.initialValues,
    });
    const onSubmit = handleSubmit((values) => {
      formData.value = {
        ...formData.value,
        ...values,
      };

      resetForm({
        values: {
          ...formData.value,
        },
      });

      if (!isLastStep.value) {
        currentStepIdx.value++;
        emit("next", formData.value);

        return;
      }

      emit("submit", formData.value);
    });

    function goToPrev() {
      if (currentStepIdx.value === 0) {
        return;
      }

      currentStepIdx.value--;
      resetForm({
        values: {
          ...formData.value,
        },
      });
    }

    return {
      onSubmit,
      hasPrevious,
      isLastStep,
      goToPrev,
    };
  },
};
</script>