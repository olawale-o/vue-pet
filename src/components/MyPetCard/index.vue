<template>
  <div class="pet__card">
    <PetToolTipPopUp v-if="choosenPet === pet.id && !modal" />
    <div class="pet__image">
      <button
        type="button"
        class="remove__btn"
        @click="$emit('setPet', pet.id)"
      >
        <span>
          <font-awesome-icon icon="ellipsis-h" class="icon" color="#fff" />
        </span>
      </button>
      <img :src="secondDog" alt="dog" />
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
          <span>{{ pet.likeCount }}</span>
        </button>
        <button type="button" class="interaction__btn">
          <span>
            <font-awesome-icon icon="tag" class="icon" />
          </span>
          <span>{{ pet.offerCount }}</span>
        </button>
      </div>
      <button type="button" class="details">Details</button>
    </div>
  </div>
</template>

<script>
import secondDog from "@/assets/images/dog2.jpg";
import { PetToolTipPopUp } from "@/components/Shared";
import { titlelize, GENDER_ENUM } from "@/helper";
export default {
  name: "MyPetCard",
  components: {
    PetToolTipPopUp,
  },
  emits: ["setPet"],
  props: {
    pet: {
      type: Object,
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
  setup() {
    return {
      secondDog,
      titlelize,
      GENDER_ENUM,
    };
  },
};
</script>

<style scoped>
@import "./style.css";
</style>
