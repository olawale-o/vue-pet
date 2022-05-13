<template>
  <div class="pet__card">
    <PetToolTipPopUp
      v-if="choosenPet === petId && !modal"
      :petNumber="choosenPet"
    />
    <div class="pet__image">
      <button type="button" class="remove__btn" @click="$emit('setPet', petId)">
        <span>
          <font-awesome-icon icon="ellipsis-h" class="icon" color="#fff" />
        </span>
      </button>
      <img :src="`${BASE_URI}/${pet.pic_url}`" alt="dog" />
    </div>
    <div class="pet__content">
      <h6 class="name">{{ titlelize(pet.name) }}</h6>
      <div class="info">
        <span>{{ GENDER_ENUM[pet.gender] }}</span>
        <span>{{ titlelize(pet.color) }}</span>
      </div>
      <div class="interactions">
        <button type="button" class="interaction__btn">
          <span>
            <font-awesome-icon icon="heart" class="icon" />
          </span>
          <span>{{ 5 }}</span>
        </button>
        <button type="button" class="interaction__btn">
          <span>
            <font-awesome-icon icon="tag" class="icon" />
          </span>
          <span>{{ 2 }}</span>
        </button>
      </div>
      <button type="button" class="details">Details</button>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import BASE_URI from "@/constants";
import { storeToRefs } from "pinia";
import { PetToolTipPopUp } from "@/components/Shared";
import { titlelize, GENDER_ENUM } from "@/helper";
import usePetStore from "@/store/pet";
export default {
  name: "MyPetCard",
  components: {
    PetToolTipPopUp,
  },
  emits: ["setPet"],
  props: {
    petId: {
      type: Number,
      required: true,
    },
    choosenPet: {
      type: Number,
      required: true,
    },
    modal: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const { myPets } = storeToRefs(usePetStore());
    const pet = computed(() => myPets.value[String(props.petId)]);
    return {
      pet,
      BASE_URI,
      titlelize,
      GENDER_ENUM,
    };
  },
};
</script>

<style scoped>
@import "./style.css";
</style>
