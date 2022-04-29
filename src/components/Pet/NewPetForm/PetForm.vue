<template>
  <div className="field">
    <CustomInput :name="formField.petName.name" placeholder="Pet Name" />
  </div>
  <div className="field">
    <CustomSlider
      :name="formField.petWeight.name"
      @on-slider-move="onSliderMove"
      @on-slider-blur="onSlideBlur"
      ref="slider"
    />
  </div>
  <div className="field">
    <CustomAutoSuggest
      :name="formField.petColor.name"
      placeholder="Pet color"
      ref="colorSuggestRef"
      :isVisible="petColorPopUp.isVisible.value"
      @on-focus="onFocus(petColorPopUp)"
      @on-search="onSearch"
      :list="pawColors"
    />
  </div>
  <div className="field">
    <CustomAutoSuggest
      :name="formField.petBreed.name"
      placeholder="Pet breed"
      ref="breedSuggestRef"
      :isVisible="petBreedPopUp.isVisible.value"
      @on-focus="onFocus(petBreedPopUp)"
      @on-search="onSearch"
      :list="dogBreeds"
    />
  </div>
  <div className="field">
    <span className="label">Gender</span>
    <CustomRadioGroup
      :name="formField.petGender.name"
      :fields="[
        {
          label: 'Male',
          fieldValue: 'm',
        },
        {
          label: 'Female',
          fieldValue: 'f',
        },
      ]"
    />
  </div>
  <div className="field">
    <CustomTextArea
      :name="formField.petDescription.name"
      placeholder="Description"
    />
  </div>
</template>

<script>
import { ref } from "vue";
// import { storeToRefs } from "pinia";
import petColors from "@/constants/petColors.js";
import { usePopUp } from "@/composables/usePopUp";
import usePetStore from "@/store/pet";
import {
  CustomInput,
  CustomTextArea,
  CustomRadioGroup,
  CustomSlider,
  CustomAutoSuggest,
} from "@/forms/Shared";
export default {
  name: "PetForm",
  components: {
    CustomInput,
    CustomTextArea,
    CustomRadioGroup,
    CustomSlider,
    CustomAutoSuggest,
  },
  props: {
    formField: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const slider = ref(null);
    const dogBreeds = ref([]);
    const colorSuggestRef = ref(null);
    const breedSuggestRef = ref(null);
    const pawColors = ref(petColors);
    const petColorPopUp = usePopUp(colorSuggestRef, false);
    const petBreedPopUp = usePopUp(breedSuggestRef, false);
    const petStore = usePetStore();
    const onSliderMove = (value) => {
      slider.value.$refs.el.style.left = `${value / 2}%`;
      slider.value.$refs.el.classList.add("show");
    };

    const onSlideBlur = () => slider.value.$refs.el.classList.remove("show");

    const onSearch = (value) => {
      if (value.trim() === "") {
        pawColors.value = petColors;
      } else {
        const filterColors = petColors.filter((color) => {
          return color.name.startsWith(value.toLowerCase());
        });
        if (filterColors.length > 0) {
          pawColors.value = filterColors;
        } else {
          pawColors.value = [value];
        }
      }
    };

    // console.log(petStore.breeds);
    dogBreeds.value = petStore.breeds;
    return {
      onSliderMove,
      onSlideBlur,
      slider,
      petColorPopUp,
      colorSuggestRef,
      petBreedPopUp,
      breedSuggestRef,
      onFocus: (ref) => {
        ref.setVisible(true);
      },
      onSearch,
      pawColors,
      dogBreeds,
    };
  },
};
</script>
