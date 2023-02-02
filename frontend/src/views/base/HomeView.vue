<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-container fluid>
    <v-row class="player-bar">
      <v-col cols="3">
        <v-icon large class="mr-2">mdi-music</v-icon>
        <span class="title">Shakira shakira</span>
      </v-col>
      <v-col cols="5">
        <span class="artist">Shakira</span>
      </v-col>
      <v-col cols="4">
        <v-btn icon><v-icon>mdi-skip-backward</v-icon></v-btn>
        <v-btn icon @click="toggleMusic"><v-icon>{{ musicToggleIcon }}</v-icon></v-btn>
        <v-btn icon><v-icon>mdi-skip-forward</v-icon></v-btn>  
        <v-btn icon v-if="isMuted" @click="toggleMute"><v-icon >mdi-volume-off</v-icon></v-btn>
        <v-btn icon v-else @click="toggleMute"><v-icon >mdi-volume-high</v-icon></v-btn>
      </v-col>
      <v-slider v-model="volume" class="mt-2 ml-2" thumb-label="always" step="1" @change="modifyVolume"></v-slider>
    </v-row>
  </v-container>
      <v-container>
        <v-row>
          <v-col v-for="music in musics" :key="music.id" cols="12" md="4">
            <v-card>
              <v-card-title>{{ music.title }}</v-card-title>
              <v-card-subtitle>{{ music.artist }}</v-card-subtitle>
              <v-card-text>{{ music.description }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-progress-linear :value="progressValue" color="green"></v-progress-linear>
      <audio ref="audioTag" @timeUpdate="updateProgress" @ended="isPlaying = false">
        <source src="@/assets/shakira.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>
    </v-responsive>
  </v-container>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { mapState } from "pinia"
import { useAccountsStore } from "@/stores/accountsStore"

export default {
  setup (_, context) {
  const src = "@/assets/shakira.mp3"
  const audioTag = ref(null)
  const progressValue = ref(0)
  const volume = ref(50)
  const isPlaying = ref(false)
  const isMuted = ref(false)
  const musics = [
      {
        id: 1,
        title: 'Shape of You',
        artist: 'Ed Sheeran',
        description: 'A hit song from Ed Sheeran\'s album "Divide"'
      },
      {
        id: 2,
        title: 'Sugar',
        artist: 'Maroon 5',
        description: 'A pop rock song from Maroon 5\'s fifth studio album "V"'
      },
      {
        id: 3,
        title: 'Uptown Funk',
        artist: 'Mark Ronson ft. Bruno Mars',
        description: 'A funky upbeat song from Mark Ronson\'s album "Uptown Special"'
      },
    ]
  const musicToggleIcon = computed(() => {
    return isPlaying.value ? "mdi-pause" : "mdi-play"
  })

  function updateProgress () {
    const audio = audioTag.value
    progressValue.value = (audio.currentTime / audio.duration) * 100
  }
  function toggleMute () {
    const audio = audioTag.value
    audio.muted =!audio.muted
    isMuted.value = audio.muted
  }
  function toggleMusic () {
    const audio = audioTag.value
    if (audio.paused) {
      audio.play()
      isPlaying.value = true
    } else {
      audio.pause()
      isPlaying.value = false
    }
  }
  function modifyVolume () {
    const audio = audioTag.value
    audio.volume = volume.value / 100
  }

  onMounted(() => {
    toggleMusic()
  })

  return {
        src,
        audioTag,
        progressValue,
        volume,
        isPlaying,
        isMuted,
        musics,
        musicToggleIcon,
        updateProgress,
        toggleMute,
        toggleMusic,
        modifyVolume,
      }
  }
}
</script>
