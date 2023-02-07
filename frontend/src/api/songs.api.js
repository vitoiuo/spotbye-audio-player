import api from "./config.js"
import apiHelpers from "./helpers.js"

export default {
    getSongs: () => {
      return new Promise((resolve, reject) => {
        api
          .get("/api/musics/list_songs")
          .then((response) => {
            return resolve(response.data)
          })
          .catch((error) => {
            return reject(error)
          })
      })
    },
    addNewsong: (data) => {
      return new Promise((resolve, reject) => {
        api
          .post("/api/musics/add_song", apiHelpers.dataToForm(data))
          .then((response) => {
            return resolve(response.data)
          })
          .catch((error) => {
            return reject(error)
          })
      })
    },
  }
  