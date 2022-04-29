<template>
  <CustomFileField
    :name="formField.petImages.name"
    @on-upload="upload"
    ref="fileUploadRef"
    :selectedFiles="selectedFiles"
    @on-file-change="onFileChange"
  />
</template>

<script>
import { ref } from "vue";
import { CustomFileField } from "@/forms/Shared";
export default {
  name: "PetImageUpload",
  components: {
    CustomFileField,
  },
  props: {
    formField: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const selectedFiles = ref([]);
    const fileUploadRef = ref(null);
    const onFileChange = (files) => {
      const fileArray = Array.from(files).map((file) => {
        return URL.createObjectURL(file);
      });
      selectedFiles.value = fileArray;
      Array.from(files).forEach((file) => URL.revokeObjectURL(file));
    };
    const upload = () => {
      fileUploadRef.value.$refs.fileRef.click();
    };
    return {
      fileUploadRef,
      selectedFiles,
      onFileChange,
      upload,
    };
  },
};
</script>
