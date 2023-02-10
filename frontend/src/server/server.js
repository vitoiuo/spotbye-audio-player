import { createServer, Model, Factory } from "miragejs"
import { faker } from '@faker-js/faker';

export function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,
    
    models: {
      song: Model,
    },

    factories: {
      song: Factory.extend({
        title() {
          return faker.music.songName()
        },
        artist () {
          return faker.name.fullName()
        },
        cover () {
          return faker.image.cats(145, 145, true)
        },
        file () {
          return "src/assets/shakira.mp3"
        }
      })
    },

    seeds(server) {
      server.createList("song", 10)
    },

    routes() {
      this.urlPrefix = 'http://localhost';
      this.namespace = "api"
      this.get("musics/list_songs", schema => {
        return schema.songs.all()
      })

    },
  })

  return server
}