<template>
  <v-app-bar app class="pa-10" location="bottom">
    <v-row class="d-flex align-center">
      <v-col cols="5" class="d-flex align-center">
        <v-avatar
          color="primary"
          size="100"
          class="rotating"
          :class="{'paused':!isPlaying}"
      >
        <img src="https://randomuser.me/api/portraits/men/82.jpg" />
      </v-avatar>
      <div class="d-flex flex-column ml-4">
        <span>
          <v-icon large class="mr-2">mdi-music</v-icon>
          <span class="title">Shakira shakira</span>
        </span>
        <span class="artist">Shakira</span>
      </div>
      </v-col>

      <v-col cols="4" class="music-controllers">
        <v-btn icon><v-icon>mdi-skip-previous</v-icon></v-btn>
        <v-btn icon @click="toggleMusic"><v-icon>{{ musicToggleIcon }}</v-icon></v-btn>
        <v-btn icon><v-icon>mdi-skip-next</v-icon></v-btn>
      </v-col>

      <v-col cols="3" class="music-controllers">
        <v-select 
          v-model="selectedSpeed"
          :items="speeds"
          @update:modelValue="changeSpeed"
          :menu-props="{ openOnHover: true }"
        />
        <v-btn icon @click="toggleMute"><v-icon >{{ soundToggleIcon }}</v-icon></v-btn>
        <v-slider v-model="volume" thumb-label="always" step="1" @update:modelValue="modifyVolume"></v-slider>
      </v-col>

      <audio  ref="audioTag" @timeUpdate="updateProgress">
          <source src="@/assets/shakira.mp3" type="audio/mpeg" @ended="isPlaying = false" loop>
          Your browser does not support the audio element.
        </audio>
    </v-row>
</v-app-bar>
</template>

<script>
import { ref, onMounted, computed } from 'vue'

export default {
  setup (_, context) {
    const src = "@/assets/shakira.mp3"
    const audioTag = ref(null)
    const progressValue = ref(0)
    const volume = ref(50)
    const isPlaying = ref(false)
    const isMuted = ref(false)
    const selectedSpeed = ref(1)
    const speeds = [2, 1.5, 1,]

    const musicToggleIcon = computed(() => {
      return isPlaying.value ? "mdi-pause" : "mdi-play"
    })

    const soundToggleIcon = computed(() => {
      return (isMuted.value || volume == 0) ? "mdi-volume-off" : "mdi-volume-high"
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
    function changeSpeed () {
      const audio = audioTag.value
      audio.playbackRate = selectedSpeed.value
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
          musicToggleIcon,
          soundToggleIcon,
          selectedSpeed,
          speeds,
          updateProgress,
          toggleMute,
          toggleMusic,
          modifyVolume,
          changeSpeed,
      }
    },
}
</script>

<style>
  .player-bar {
    border: 1px solid darkgray;
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
