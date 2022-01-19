<template>
  <div class="auth-container">
    <div class="container">
      <div class="form-container" :class="{ slide: isFocus }">
        <div class="login-container">
          <form>
            <h1>Welcome back</h1>
            <div class="switch-buttons">
              <button
                type="button"
                class="switch-btn"
                :class="{ active: !isFocus }"
                @click="onActive"
              >
                Login
              </button>
              <button
                type="button"
                class="switch-btn"
                :class="{ active: isFocus }"
                @click="onActive"
              >
                Register
              </button>
            </div>
            <div class="continue-with">
              <button type="button" class="google">Google</button>
              <button type="button" class="facebook">Facebook</button>
            </div>
            <div class="or">
              <span class="left"></span>
              <span class="text">or</span>
              <span class="right"></span>
            </div>
            <div class="field">
              <input type="text" placeholder="Email" class="input" />
            </div>
            <div class="field">
              <input type="text" placeholder="Password" class="input" />
            </div>
            <button type="button" class="auth-btn">Log in</button>
          </form>
        </div>
        <div class="signup-container">
          <form>
            <h1>Getting Started</h1>
            <div class="switch-buttons">
              <button
                type="button"
                class="switch-btn"
                :class="{ active: !isFocus }"
                @click="onActive"
              >
                Login
              </button>
              <button
                type="button"
                class="switch-btn"
                :class="{ active: isFocus }"
                @click="onActive"
              >
                Register
              </button>
            </div>
            <div class="continue-with">
              <button type="button" class="google">Google</button>
              <button type="button" class="facebook">Facebook</button>
            </div>
            <div class="or">
              <span class="left" />
              <span class="text">or</span>
              <span class="right" />
            </div>
            <div class="field">
              <input type="text" placeholder="Username" class="input" />
            </div>
            <div class="field">
              <input type="text" placeholder="Email" class="input" />
            </div>
            <div class="field">
              <input type="text" placeholder="Password" class="input" />
            </div>
            <button type="button" class="auth-btn">Create</button>
          </form>
        </div>
      </div>
      <div class="overlay-container"></div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "user",
  setup() {
    const isFocus = ref(false);
    const onActive = () => {
      console.log("onActive");
      isFocus.value = !isFocus.value;
    };
    return {
      isFocus,
      onActive,
    };
  },
};
</script>

<style scoped></style>
