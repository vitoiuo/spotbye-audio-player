// Plugins
import vue from "@vitejs/plugin-vue"
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify"
import { createServer } from "miragejs"
// Utilities
import { defineConfig } from "vite"
import { fileURLToPath, URL } from "node:url"

console.log('AAAAAAAAAAAAAAAAAAAA' + process.env.DEVELOPMENT_MODE)
if (process.env.DEVELOPMENT_MODE === 'mock') {
  createServer({
    routes() {
      this.namespace = "api"
      this.urlPrefix = 'http://localhost:8000/';
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

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
  ],
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  server: {
    port: 3000,
  },
})
