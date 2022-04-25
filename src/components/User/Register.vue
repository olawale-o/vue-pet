<template>
  <div class="signup-container">
    <Form
      @submit="onSubmit"
      :validation-schema="registerSchema"
      :initial-values="registerInitialValues"
      v-slot="{ isSubmitting, meta: { dirty, valid } }"
    >
      <AuthFormHeader :title="title" :is-focus="isFocus" @on-reset="onReset" />
      <div class="field">
        <Field
          :name="username.name"
          type="text"
          class="input"
          placeholder="Username"
        />
        <ErrorMessage name="username" class="error" />
      </div>
      <div class="field">
        <Field
          :name="registerEmail.name"
          type="email"
          class="input"
          placeholder="Email"
        />
        <ErrorMessage name="email" class="error" />
      </div>
      <div class="field">
        <Field
          :name="registerPassword.name"
          type="password"
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
        Create
      </button>
    </Form>
  </div>
</template>

<script>
import { Form, ErrorMessage, Field } from "vee-validate";
import { AuthFormHeader } from "@/components/Shared";
import { authSchema, authInitialValues, authModel } from "@/forms/Auth";
export default {
  name: "RegisterComponent",
  emits: ["onActive", "onRegister"],
  props: {
    isFocus: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    AuthFormHeader,
    Field,
    ErrorMessage,
    Form,
  },
  setup(props, { emit }) {
    const {
      register: {
        formField: { registerEmail, registerPassword, username },
      },
    } = authModel;
    const { registerSchema } = authSchema;
    const { registerInitialValues } = authInitialValues;
    return {
      title: "Getting Started",
      onLogin: () => {
        emit("onRegister");
      },
      onReset: () => {
        emit("onActive");
      },
      onSubmit: ({ username, email, password }) => {
        emit('onRegister', { user: { username, email, password } });
      },
      registerEmail,
      registerPassword,
      username,
      registerSchema,
      registerInitialValues,
    };
  },
};
</script>
