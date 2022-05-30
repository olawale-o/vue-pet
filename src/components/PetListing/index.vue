<template>
  <div class="listings">
    <div class="listing__pet">
      <ListingPetCard v-for="(petId, key) in petIds" :key="key"  :petId="petId"/>
      <div class="pagination">
        <div class="pagination__buttons">
          <button
            type="button"
            title="prev"
            class="button pagination__button prev"
          >
            Previous
          </button>
          <button
            type="button"
            title="next"
            class="button pagination__button next"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ListingPetCard from "@/components/ListingPetCard";
export default {
  name: "PetListing",
  components: {
    ListingPetCard,
  },
  props: {
    petIds: {
      type: Array,
    },
  },
  setup() { },
}
</script>

<style scoped>
@import "./style.css";
</style>