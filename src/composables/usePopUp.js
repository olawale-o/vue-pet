import { ref } from "vue";
import { useEventListener } from "./useEventListener";

export function usePopUp(el, initialState = false) {
  const isVisible = ref(initialState);

  const handleClickOutside = (event) => {
    if (!el.value.$refs.el.contains(event.target)) {
      isVisible.value = false;
    }
  };

  const setVisible = (value) => {
    isVisible.value = value;
  };

  useEventListener(document, "click", handleClickOutside);

  return { isVisible, setVisible };
}
