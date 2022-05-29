<template>
  <div class="pet__card">
    <CustomToolTipPopUp
      v-if="choosenPet === petId && !modal"
      :petNumber="choosenPet"
    >
      <ToolTipItem v-for="(action, key) in actions" :key="key">
        <ToolTipButton @on-action="action.func">
          {{ action.text }}
        </ToolTipButton>
      </ToolTipItem>
    </CustomToolTipPopUp>
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
            <font-awesome-icon
              color="#E9547C"
              icon="heart"
              aria-label="like"
              class="icon"
              title="like"
              v-if="pet.liked_by_me"
            />
            <font-awesome-icon
              color="#E9547C"
              icon="heart"
              aria-label="like"
              class="icon"
              title="like"
              v-else
            />
          </span>
          <span className="count">{{ pet.likes }}</span>
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
import { computed, inject } from "vue";
import BASE_URI from "@/constants";
import { storeToRefs } from "pinia";
import { CustomToolTipPopUp } from "@/components/Shared";
import { ToolTipButton, ToolTipItem } from "@/components/slots";
import { titlelize, GENDER_ENUM } from "@/helper";
import usePetStore from "@/store/pet";
export default {
  name: "MyPetCard",
  components: {
    CustomToolTipPopUp,
    ToolTipButton,
    ToolTipItem,
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
    const { openModal, onPetDelete, onPetPhoto } = inject("edit");
    const { myPets } = storeToRefs(usePetStore());
    const pet = computed(() => myPets.value[String(props.petId)]);
    const actions = [
      {
        id: 1,
        text: "Delete",
        func: () => onPetDelete(props.petId),
      },
      {
        id: 2,
        text: "Edit",
        func: () => openModal(),
      },
      {
        id: 3,
        text: "Photos",
        func: () => onPetPhoto(props.petId),
      },
    ];
    return {
      actions,
      pet,
      BASE_URI,
      titlelize,
      GENDER_ENUM,
      openModal,
      onPetDelete,
      onPetPhoto,
    };
  },
};
</script>

<style scoped>
@import "./style.css";
</style>
