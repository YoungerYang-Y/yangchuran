import { createApp } from "vue";
import App from "@/App.vue";
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

import "@/assets/css/app.css";

const router = createRouter({
    history: createWebHistory(),
    routes,
  })

const app = createApp(App);

app.use(router);

app.mount("#app");
