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
import { createServer } from "miragejs"

const app = createApp(App)

registerPlugins(app)

if (process.env.DEVELOPMENT_MODE === 'mock') {
  createServer({
    routes() {
      this.namespace = "api"
      // this.urlPrefix = 'http://localhost:8000';
      this.get("/musics/list_songs", () => {
        return {
          songs: [
            { id: 1, title: "Bump of Galinha", artist:"Bump of Chicken", cover: "https://images.genius.com/8d12300f2776f719bd9f1a7f4a2354e9.1000x1000x1.jpg" },
          ],
        }
      })
    },
  })
}

app.mount("#app")
