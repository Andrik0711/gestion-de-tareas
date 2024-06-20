import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import axios from "./plugins/axios";

createApp(App).use(store).use(axios).mount("#app");
