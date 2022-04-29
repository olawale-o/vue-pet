import { computed } from "vue";

export function useValidationListeners(errorMessage, handler) {
  const validationListeners = computed(() => {
    if (!errorMessage.value) {
      return {
        blur: handler,
        change: handler,
        input: (e) => handler(e, false),
      };
    }
    return {
      blur: handler,
      change: handler,
      input: handler,
    };
  });
  return validationListeners;
}
