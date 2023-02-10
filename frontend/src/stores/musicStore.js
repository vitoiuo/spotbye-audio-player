import { defineStore } from "pinia"

export const useMusicStore = defineStore("musicStore", {
  state: () => ({
    musicRow: []
  }),
  actions: {
    setMusicInRow (newMusic) {
        if(!this.musicRow.some(e => e.id === newMusic.id)) {
          this.musicRow.push(newMusic)
        }
    },
    shuffleRow () {
      this.musicRow.forEach((_, index, array) => {
          const randomIndex =  index + Math.floor(Math.random() * (array.length - index));

          const randomIndexVal = array[randomIndex]
          array[randomIndex] = array[index];
          array[index] = randomIndexVal;
      })
    },
    clearRow () {
      this.musicRow = []
    }
  },
})
