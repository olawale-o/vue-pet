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
import { useRouter } from "vue-router";
import { loginService, registerService } from "@/services";
import useUserAuthStore from "@/store/auth";
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

    const authStore = useUserAuthStore();
    const router = useRouter();

    provide("active", {
      isFocus,
      onActive,
    });

    const onLogin = async (values) => {
      await authStore.login(values, loginService, router.push);
    };

    const onRegister = async (values) => {
      await authStore.register(values, registerService, router.push);
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
