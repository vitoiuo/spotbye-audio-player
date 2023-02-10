import { createServer } from "miragejs"

export function makeServer({ environment = "mock" } = {}) {
  let server = createServer({
    environment,

    routes() {
      this.urlPrefix = 'http://localhost';
      this.namespace = "api"

      this.get("musics/list_songs", () => {
        return {
        songs:[
          { id: 1, title: "Bump of Galinha",
           artist:"Bump of Chicken",
            cover: "https://images.genius.com/8d12300f2776f719bd9f1a7f4a2354e9.1000x1000x1.jpg" 
          },
        ]
      }
      })

    },
  })

  return server
}