<template>
  <div class="listings">
    <div class="listing__pet">
      <ListingPetCard
        v-for="(petId, key) in petIds"
        :key="key"
        :petId="petId"
      />
      <div class="pagination">
        <div class="pagination__buttons">
          <button
            type="button"
            title="prev"
            class="button pagination__button prev"
            :disabled="
              searchMeta.prev_page_no === null ||
              searchMeta.prev_page_no === undefined ||
              searchMeta.prev_page_no === 0
            "
            @click="paginate(searchMeta.prev_page_no, 'prev')"
          >
            Previous
          </button>
          <button
            type="button"
            title="next"
            class="button pagination__button next"
            :disabled="
              searchMeta.next_page_no === null ||
              searchMeta.next_page_no === undefined ||
              searchMeta.next_page_no === 0
            "
            @click="paginate(searchMeta.next_page_no, 'next')"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from "vue";
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
  setup() {
    const { searchMeta, paginate } = inject("sideParams");
    return {
      searchMeta,
      paginate,
    };
  },
};
</script>

<style scoped>
@import "./style.css";
</style>
