<template>
  <div className="pet__upload">
    <input
      type="file"
      :name="name"
      required
      multiple
      id="file-uploader"
      ref="fileRef"
      accept="image/*"
      @change="fileChange"
    />
    <label htmlFor="file-uploader" className="file__label">
      <button
        type="button"
        className="upload__button"
        @click="$emit('onUpload')"
      >
        Upload
      </button>
    </label>
    <div className="drop__zone">
      <template v-if="selectedFiles">
        <img
          v-for="(file, key) in selectedFiles"
          :key="key"
          :src="file"
          alt="pet"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { useField } from "vee-validate";
import { toRef } from "vue";
export default {
  name: "CustomFileField",
  emits: ["onUpload", "onFileChange"],
  props: {
    name: {
      type: String,
      required: true,
    },
    selectedFiles: {
      type: Array,
    },
  },
  setup(props, { emit }) {
    const { setValue } = useField(toRef(props, "name"), undefined, {
      validateOnValueUpdate: false,
    });
    return {
      fileChange: (e) => {
        const { files } = e.target;
        setValue([...files]);
        emit("onFileChange", files);
      },
    };
  },
};
</script>
