<template>
  <v-app-bar class="pa-10">
    <v-avatar
          color="primary"
          size="100"
          class="rotating"
          :class="{'paused':!isPlaying}"
          tile
      >
        <img :src="currentSong.cover" />
      </v-avatar>
      <div class="d-flex flex-column ml-4">
        <span>
          <span class="title">{{ currentSong.title }}</span>
        </span>
        <span class="artist">{{ currentSong.artist }}</span>
      </div>
    <v-row class="d-flex justify-center align-center">
      <v-col cols="6">
        <div>
          <v-btn icon @click="handleSongsQueue(-1)"><v-icon>mdi-skip-previous</v-icon></v-btn>
          <v-btn icon @click="toggleMusic"><v-icon>{{ musicToggleIcon }}</v-icon></v-btn>
          <v-btn icon @click="handleSongsQueue(1)"><v-icon>mdi-skip-next</v-icon></v-btn>
        </div>
      </v-col>
      <v-col cols="6" class="music-controllers">
        <v-select 
          v-model="selectedSpeed"
          :items="speeds"
          @update:modelValue="changeSpeed"
          :menu-props="{ openOnHover: true }"
        />
        <v-btn icon @click="loop = !loop" :class='{"looping-btn":loop}'><v-icon>mdi-repeat</v-icon></v-btn>
        <v-btn icon @click="toggleMute">
          <v-icon>{{ soundToggleIcon }}</v-icon>
        </v-btn>
        <v-slider v-model="volume" @update:modelValue="modifyVolume"></v-slider>
      </v-col>

       <v-slider color="green" @update:modelValue="controlProgress" :model-value="progressValue"/>

      <audio ref="audioTag" @ended="handleSongsQueue(1)" :loop="loop" @timeupdate="updateProgress">
        <source type="audio/mpeg" >
        Your browser does not support the audio element.
      </audio>
    </v-row>
    
</v-app-bar>
</template>

<script>
import { ref, onMounted, computed } from 'vue'

export default {
  props: {
    songs: {
      type: Array,
      default: []
    }
  },
  setup (props, context) {
    const songs = ref(props.songs)
    const queuePosition = ref(0)
    const audioTag = ref(null)
    const progressValue = ref(0)
    const volume = ref(50)
    const isPlaying = ref(false)
    const isMuted = ref(false)
    const selectedSpeed = ref(1)
    const speeds = [2, 1.5, 1]
    const loop = ref(false)

    const musicToggleIcon = computed(() => {
      return isPlaying.value ? "mdi-pause" : "mdi-play"
    })
    const soundToggleIcon = computed(() => {
      return (isMuted.value || volume.value === 0) ? "mdi-volume-off" : "mdi-volume-high"
    })
    const currentSong = computed(() => {
      return songs.value[queuePosition.value]
    })
    const hasNextSong = computed(() => {
      return queuePosition.value + 1 < songs.value.length
    })

    function controlProgress(newValue) {
      const audio = audioTag.value
      audio.currentTime = newValue / 100 * audio.duration
    }
    function updateProgress () {
      const audio = audioTag.value
      progressValue.value = audio.currentTime / audio.duration * 100
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
    function changeSpeed () {
      const audio = audioTag.value
      audio.playbackRate = selectedSpeed.value
    }
    function handleSongsQueue (value) {
      const audio = audioTag.value
      if (value === 1) context.emit("close-player")
      if (!hasNextSong.value) return isPlaying.value = false
      queuePosition.value+=value
      if (currentSong.value) {
        audio.src = '/media/'+currentSong.value.file
        toggleMusic()
      }
    }
    onMounted(() => {
      const audio = audioTag.value
      audio.src = '/media/'+currentSong.value.file
      toggleMusic()
    })

    return {
          audioTag,
          volume,
          isPlaying,
          isMuted,
          progressValue,
          musicToggleIcon,
          soundToggleIcon,
          selectedSpeed,
          speeds,
          loop,
          songs,
          queuePosition,
          currentSong,
          hasNextSong,
          toggleMute,
          toggleMusic,
          modifyVolume,
          changeSpeed,
          controlProgress,
          updateProgress,
          handleSongsQueue,
      }
    },
}
</script>

<style>
  .player-bar {
    border: 1px solid darkgray;
  }
  .looping-btn {
    color: green;
  }
  .music-controllers {
    display: flex;
    gap: 8px;
  }
  .rotating {
    animation: rotate 3s linear infinite forwards;
  }
  .paused {
    animation-play-state: paused;
  }
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
