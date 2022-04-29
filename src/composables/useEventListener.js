import { onMounted, onUnmounted } from "vue";

export function useEventListener(el, event, handler) {
  onMounted(() => {
    el.addEventListener(event, handler);
  });

  onUnmounted(() => {
    el.removeEventListener(event, handler);
  });
}
