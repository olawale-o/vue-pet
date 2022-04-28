<template>
  <div class="pet">
    <NewPetForm />
  </div>
</template>

<script>
import NewPetForm from "@/components/Pet/NewPetForm";
export default {
  name: "NewPet",
  components: {
    NewPetForm,
  },
  setup() {},
};
</script>
