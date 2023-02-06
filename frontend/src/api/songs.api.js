import api from "./config.js"
import apiHelpers from "./helpers.js"

export default {
    getsongs: () => {
      return new Promise((resolve, reject) => {
        api
          .get("/api/songs/listSongs")
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
          .post("/api/songs/addSong", apiHelpers.dataToForm(data))
          .then((response) => {
            return resolve(response.data)
          })
          .catch((error) => {
            return reject(error)
          })
      })
    },
  }
  