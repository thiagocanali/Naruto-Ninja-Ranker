// src/main.js
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import { useNinjaStore } from "@/store/ninjaStore";

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(router);

app.mount("#app");

// carregar ninjas ao iniciar
const store = useNinjaStore();
store.fetchNinjas();
