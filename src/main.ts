import { setupLayouts } from 'virtual:generated-layouts'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import App from '@/App.vue'

import '@/assets/css/app.css'

const router = createRouter({
  history: createWebHistory(),
  routes: setupLayouts(routes),
})

const app = createApp(App)

app.use(router)

app.mount('#app')
