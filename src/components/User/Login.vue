<template>
  <div class="login-container">
    <Form
      @submit="onSubmit"
      :validation-schema="loginSchema"
      :initial-values="loginInitialValues"
      v-slot="{ isSubmitting, meta: { dirty, valid } }"
    >
      <AuthFormHeader :title="title" @on-reset="onReset" />
      <div class="field">
        <Field
          :name="email.name"
          type="email"
          class="input"
          placeholder="Email"
        />
        <ErrorMessage name="email" class="error" />
      </div>
      <div class="field">
        <Field
          :name="password.name"
          type="email"
          class="input"
          placeholder="Password"
        />
        <ErrorMessage name="password" class="error" />
      </div>
      <button
        type="submit"
        class="button button-primary"
        :disabled="isSubmitting || !(dirty && valid)"
      >
        Log in
      </button>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import { AuthFormHeader } from "@/components/Shared";
import { authSchema, authInitialValues, authModel } from "@/forms/Auth";
export default {
  name: "LoginComponent",
  emits: ["onActive", "onLogin"],
  components: {
    Field,
    ErrorMessage,
    Form,
    AuthFormHeader,
  },
  setup(props, { emit }) {
    const {
      login: {
        formField: { email, password },
      },
    } = authModel;
    const { loginSchema } = authSchema;
    const { loginInitialValues } = authInitialValues;
    return {
      title: "Welcome Back",
      onSubmit: ({ email, password }) => {
        emit("onLogin", { user: { email, password } });
      },
      onReset: () => {
        emit("onActive");
      },
      loginSchema,
      loginInitialValues,
      email,
      password,
    };
  },
};
</script>
