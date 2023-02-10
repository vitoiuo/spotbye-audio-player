/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue"

// Composables
import { createApp } from "vue"

// Plugins
import { registerPlugins } from "@/plugins"
import { makeServer } from "./server"

const app = createApp(App)

registerPlugins(app)

if (process.env.DEVELOPMENT_MODE === 'mock') {
  makeServer()
}

app.mount("#app")
