import { createApp } from "vue";
import router from "./routes";
import "./assets/index.css";
import App from "./App.vue";
import pinia from "./store";
import icons from "./icons";
import api from "./api";
import useRootStore from "./store/root";

api.interceptors.request.use((config) => {
  const rootStore = useRootStore();
  const token = rootStore.currentToken;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    throw error;
  }
);

const app = createApp(App);
app.use(pinia);
app.use(router);
app.component("font-awesome-icon", icons);
app.mount("#app");
