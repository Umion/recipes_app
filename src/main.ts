import './assets/styles/main.css'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Layouts
import DefaultLayout from "@/layouts/DefaultLayout.vue";


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

app.component("default-layout", DefaultLayout);

app.use(createPinia())
app.use(router)
app.use(vuetify)

router.isReady().then(() => {
  app.mount('#app')
})
