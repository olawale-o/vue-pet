<template>
  <div class="pet__form">
    <FormWizard
      :validation-schema="newPetSchema"
      :initial-values="newPetInitialValues"
      @submit="onSubmit"
    >
      <FormStep>
        <PetForm :form-field="formField" />
      </FormStep>
      <FormStep>
        <PetImageUpload :form-field="formField" />
      </FormStep>
    </FormWizard>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { FormStep, FormWizard } from "@/forms/Shared";
import PetForm from "@/components/Pet/PetForm.vue";
import PetImageUpload from "./ImageUpload.vue";
import { newPetInitialValues, newPetSchema, newPetModel } from "@/forms/Pet";
import usePetStore from "@/store/pet";
import { getDogBreedsService } from "@/services";
export default {
  name: "NewPetForm",
  components: {
    PetForm,
    PetImageUpload,
    FormStep,
    FormWizard,
  },
  setup() {
    const { formField } = newPetModel;
    const petStore = usePetStore();
    onMounted(async () => {
      await petStore.getBreeds(getDogBreedsService);
    });
    return {
      newPetSchema,
      newPetInitialValues,
      formField,
      onSubmit: (formData) => {
        console.log(JSON.stringify(formData, null, 2));
      },
    };
  },
};
</script>

<style scoped>
@import "./style.css";
</style>
