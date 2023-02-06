import { defineStore } from "pinia"

export const useMusicStore = defineStore("musicStore", {
  state: () => ({
    musicRow: []
  }),
  actions: {
    setMusicInRow (newMusic) {
        this.musicRow.push(newMusic)
    }
  },
})
