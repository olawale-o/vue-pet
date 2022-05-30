<template>
  <div class="listing__dog">
    <router-link class="link-overlay" :to="`listings/${pet.id}`">
      {{ " " }}
    </router-link>
    <div class="inner">
      <div class="img">
        <img :src="`${BASE_URI}${pet.pic_url}`" alt="dog" :title="pet.name" />
        <div class="media">
          <div class="camera">
            <span class="icon mx-2" title="media"></span>
            <span>{{ pet.images.length }}</span>
          </div>
        </div>
      </div>
      <div class="inner__details">
        <h1>
          <span class="pet_name">
            {{ titlelize(pet.name) }}
          </span>
          {{ " " }}
          <router-link class="owner_name" to="/#">
            @
            {{ titlelize(pet.owner) }}
          </router-link>
        </h1>
        <div class="middle">
          <span class="for">BREEDER</span>
          <p>
            <span class="icon"></span>
            <span>Lagos</span>
          </p>
        </div>
        <p class="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum
          dolor.
        </p>

        <div class="bottom">
          <span class="tag">{{ titlelize(pet.name) }}</span>
          <div class="dot" />
          <span class="tag">{{ GENDER_ENUM[pet.gender] }}</span>
        </div>
      </div>
      <div class="interaction">
        <span>$ 4000</span>
        <button type="button" class="interaction__btn" title="like">
          <span class="icon" title="like"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import BASE_URI from "@/constants";
import { computed } from "vue";
import usePetStore from "@/store/pet";
import { storeToRefs } from "pinia";
import { titlelize, GENDER_ENUM } from "@/helper";
export default {
  name: "ListingPetCard",
  props: {
    petId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { allPets } = storeToRefs(usePetStore());
    const pet = computed(() => allPets.value[String(props.petId)]);

    return {
      pet,
      titlelize,
      GENDER_ENUM,
      BASE_URI,
    };
  },
};
</script>

<style scoped>
@import "./style.css";
</style>
