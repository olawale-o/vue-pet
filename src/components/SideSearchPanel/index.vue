<template>
  <div class="search__panel">
    <div class="container">
      <div class="panel__card">
        <h6 class="title">Gender</h6>
        <ul class="list">
          <li v-for="({ name, value }, key) in genders" :key="key">
            <input
              type="radio"
              :id="value"
              class="checkbox"
              :value="value"
              v-model="fieldState.gender"
              @change="onGenderSelected(value)"
            />
            <label :htmlFor="value">{{ name }}</label>
          </li>
        </ul>
      </div>
      <div class="panel__card">
        <h6 class="title">Category</h6>
        <ul class="list">
          <li
            class="item"
            v-for="({ name, value }, key) in breedTypes"
            :key="key"
          >
            <input
              type="radio"
              :id="value"
              :value="value"
              class="checkbox"
              v-model="fieldState.breed"
              @change="onBreedSelected(value)"
            />
            <label :htmlFor="value">{{ name }}</label>
          </li>
        </ul>
      </div>
      <div class="panel__card">
        <h6 class="title">Color</h6>
        <div
          ref="searchInputRef"
          class="search__input"
          :class="{ active: isVisible }"
        >
          <input
            type="text"
            placeholder="Color"
            autoComplete="off"
            @focus="onSearchInputActive"
            @keydown="onSearch"
            v-model="fieldState.color"
          />
          <ul class="match__box">
            <li v-for="({ name }, key) in pawColors" :key="key">
              <button type="button" @click="onSelectedColor(name)">
                {{ name }}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, ref, onMounted } from "vue";
export default {
  name: "SideSearchPanel",
  setup() {
    const isVisible = ref(false);
    const searchInputRef = ref();
    const {
      fieldState,
      genders,
      breedTypes,
      petColors,
      onColorSelected,
      onGenderSelected,
      onBreedSelected,
    } = inject("sideParams");
    const pawColors = ref(petColors);
    const onSearch = (e) => {
      const {
        target: { value },
      } = e;
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
    onMounted(() => {
      const onOutSideClick = (event) => {
        if (
          searchInputRef.value &&
          !searchInputRef.value.contains(event.target)
        ) {
          isVisible.value = false;
        }
      };
      document.addEventListener("click", onOutSideClick);
    });
    return {
      fieldState,
      genders,
      breedTypes,
      pawColors,
      isVisible,
      searchInputRef,
      onGenderSelected,
      onBreedSelected,
      onSearchInputActive: () => {
        isVisible.value = !isVisible.value;
      },
      onSelectedColor: (name) => {
        onColorSelected(name);
        isVisible.value = false;
      },
      onSearch,
    };
  },
};
</script>

<style scoped>
@import "./style.css";
</style>
