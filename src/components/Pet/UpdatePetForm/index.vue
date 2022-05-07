<template>
  <div class="modal" @click="$emit('close')">
    <div class="modal__body" @click="(event) => event.stopPropagation()">
      <div class="pet__form w-100">
        <form @submit="onSubmit">
          <PetFormVue :formField="formField" />
          <div className="actions">
            <button type="submit" class="btn btn__primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { useForm } from "vee-validate";
import PetFormVue from "@/components/Pet/PetForm.vue";
import { newPetSchema, newPetModel } from "@/forms/Pet";
import usePetStore from "@/store/pet";
export default {
  name: "UpdatePetForm",
  emits: ["close"],
  components: {
    PetFormVue,
  },
  setup() {
    const { selectedPet } = storeToRefs(usePetStore());
    const currentValidationSchema = newPetSchema[0];
    const {
      formField: {
        petName,
        petWeight,
        petColor,
        petBreed,
        petDescription,
        petGender,
      },
    } = newPetModel;    
    const initialValues = {
      [petName.name]: selectedPet.value.name,
      [petWeight.name]: selectedPet.value.weight,
      [petColor.name]: selectedPet.value.color,
      [petBreed.name]: selectedPet.value.breed,
      [petDescription.name]: selectedPet.value.description,
      [petGender.name]: selectedPet.value.gender,
    };

    const { handleSubmit } = useForm({
      validationSchema: currentValidationSchema,
      initialValues: initialValues,
    });

    const onSubmit = handleSubmit((values) => {
      console.log(values);
    });

    return {
      currentValidationSchema,
      formField: {
        petName,
        petWeight,
        petColor,
        petBreed,
        petDescription,
        petGender,
      },
      onSubmit,
    };
  },
};
</script>
<style scoped>
  @import "./style.css";
</style>