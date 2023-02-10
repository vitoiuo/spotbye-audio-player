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
import { makeServer } from "./server/server"

const app = createApp(App)

registerPlugins(app)

if (import.meta.env.MODE === "development" && import.meta.env.VITE_API_MOCK === "true") {
  makeServer()
}

app.mount("#app")
