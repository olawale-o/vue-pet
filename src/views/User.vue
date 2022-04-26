<template>
  <div class="auth-container">
    <div class="container">
      <div class="form-container" :class="{ slide: isFocus }">
        <LoginComponent @on-login="onLogin" />
        <RegisterComponent @on-register="onRegister" />
      </div>
      <div class="overlay-container"></div>
    </div>
  </div>
</template>

<script>
import { ref, provide } from "vue";
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

    provide("active", {
      isFocus,
      onActive,
    });

    const onLogin = async (values) => {
      console.log(values);
    };

    const onRegister = async (values) => {
      console.log(values);
    };

    return {
      isFocus,
      onLogin,
      onRegister,
    };
  },
};
</script>

<style scoped></style>
