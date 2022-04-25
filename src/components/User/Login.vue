<template>
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
</template>