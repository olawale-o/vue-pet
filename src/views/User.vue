<template>
  <div class="auth-container">
    <div class="container">
      <div class="form-container" :class="{ slide: isFocus }">
        <LoginComponent
          :is-focus="isFocus"
          @on-active="onActive"
          @on-login="onLogin"
        />
        <RegisterComponent
          :is-focus="isFocus"
          @on-active="onActive"
          @on-register="onRegister"
        />
      </div>
      <div class="overlay-container"></div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import LoginComponent from "@/components/User/Login";
import RegisterComponent from "@/components/User/Register";
export default {
  name: "user",
  components: {
    LoginComponent,
    RegisterComponent,
  },
  setup() {
    const isFocus = ref(false);
    const onActive = () => {
      isFocus.value = !isFocus.value;
    };

    const onLogin = async (values) => {
      console.log(values);
    };

    const onRegister = async (values) => {
      console.log(values);
    };

    return {
      isFocus,
      onActive,
      onLogin,
      onRegister,
    };
  },
};
</script>

<style scoped></style>
