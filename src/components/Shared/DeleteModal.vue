<template>
  <div class="delete__container">
    <h6 class="heading_6">Delete Pet?</h6>
    <p class="modal__text">
      This can’t be undone and it will be removed from your profile, and from
      Paw search results.
    </p>
    <button
      type="button"
      class="button button__danger"
      @click="console.log('wale')"
    >
      Delete
    </button>
    <button
      type="button"
      class="button button__cancel"
      @click="console.log('cancel')"
    >
      Cancel
    </button>
  </div>
</template>
<script>
export default {
  name: "DeleteModal",
  setup() {},
};
</script>
