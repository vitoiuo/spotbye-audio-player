import { defineStore } from "pinia"

export const useMusicStore = defineStore("musicStore", {
  state: () => ({
    musicRow: [],
    musicRowBackup: [],
    currentSong: null,
    queuePosition: 0,
  }),
  getters: {
    hasNextSong (state) {
      return state.queuePosition + 1 < state.musicRow.length
    },
    hasPreviousSong (state) {
      return state.queuePosition !== 0
    }
  },
  actions: {
    setMusicInRow (newMusic) {
        if(!this.musicRow.some(e => e.id === newMusic.id)) {
          this.musicRow.push(newMusic)
        }
    },
    shuffleRow () {
      this.musicRowBackup = [...this.musicRow]

      this.musicRow.forEach((_, index, array) => {
          const randomIndex =  index + Math.floor(Math.random() * (array.length - index));
          const randomIndexVal = array[randomIndex]
          this.musicRow[randomIndex] = array[index];
          this.musicRow[index] = randomIndexVal;
      })
      this.currentSong = this.musicRow.find(e => e.id === this.currentSong.id)
    },
    unShuffleRow () {
      this.musicRow = this.musicRowBackup
      this.currentSong = this.musicRow.find(e => e.id === this.currentSong.id)
    },
    setCurrentSong (directionValue) {
      this.currentSong  = this.musicRow[this.queuePosition]
      if ((this.queuePosition === 1 && !this.hasNextSong.this.queuePosition) 
      || (this.queuePosition === -1 && !this.hasPreviousSong.this.queuePosition)) {
        return
     }
     this.queuePosition+=directionValue
    },
    clearMusicRow () {
      this.musicRow = []
      this.currentSong = null
    }
  },
})



// const hasNextSong = computed(() => {
//   return queuePosition.value + 1 < songs.value.length
// })
// const hasPreviousSong = computed(() => {
//   return queuePosition.value !== 0
// })
