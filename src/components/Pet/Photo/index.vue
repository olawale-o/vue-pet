<template>
  <div class="photo">
    <CustomToolTipPopUp
      v-if="choosenPhoto === photoId"
      :petNumber="choosenPhoto"
    >
      <ToolTipItem v-for="(action, key) in actions" :key="key">
        <ToolTipButton @on-action="action.func">{{action.text}}</ToolTipButton>
      </ToolTipItem>
    </CustomToolTipPopUp>
    <img :src="`${BASE_URI}${photo.url}`" alt="dog" />
    <button
      type="button"
      class="photo__btn"
      @click="$emit('setPhoto', photoId)"
    >
      <font-awesome-icon icon="pen" class="icon" color="#fff" />
    </button>
  </div>
</template>

<script>
import BASE_URI from "@/constants";
import { computed } from "vue";
import { storeToRefs } from "pinia";
import usePetStore from "@/store/pet";
import { CustomToolTipPopUp } from "@/components/Shared";
import { ToolTipButton, ToolTipItem } from "@/components/slots";
export default {
  name: "Photo",
  components: {
    CustomToolTipPopUp,
    ToolTipButton,
    ToolTipItem,
  },
  emits: ["setPhoto", "makeProfilePhoto"],
  props: {
    photoId: {
      type: Number,
      required: true,
    },
    choosenPhoto: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { photos } = storeToRefs(usePetStore());
    const photo = computed(() => photos.value[String(props.photoId)]);
    const actions = [
      {
        id: 1,
        text: 'Delete',
        func: () => console.log("delete" + props.photoId),
      },
      {
        id: 2,
        text: 'Make profile photo',
        func: () => emit("makeProfilePhoto", photo.value.url),
      },
    ];
    return {
      BASE_URI,
      photo,
      actions,
    };
  },
};
</script>
