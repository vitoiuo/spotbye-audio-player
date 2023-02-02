<template>
  <div>
    <v-row class="player-bar">
      <v-avatar
        color="primary"
        size="100"
        class="rotating"
        :class="{'paused':!isPlaying}"
      >
      <img src="https://randomuser.me/api/portraits/men/82.jpg" />
    </v-avatar>
        <audio ref="audioTag" @timeUpdate="updateProgress" @ended="isPlaying = false" loop>
          <source src="@/assets/shakira.mp3" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
      <v-col cols="3">
        <v-icon large class="mr-2">mdi-music</v-icon>
        <span class="title">Shakira shakira</span>
      </v-col>
      <v-col cols="5">
        <span class="artist">Shakira</span>
      </v-col>
      <v-col cols="4" class="music-controllers">
        <v-btn icon><v-icon>mdi-skip-backward</v-icon></v-btn>
        <v-btn icon @click="toggleMusic"><v-icon>{{ musicToggleIcon }}</v-icon></v-btn>
        <v-btn icon><v-icon>mdi-skip-forward</v-icon></v-btn>
      </v-col>
      <v-col cols="1">
        <v-select v-model="selectedSpeed" :items="speeds" @input="changeSpeed"  :menu-props="{ openOnHover: true }"/>
      </v-col>
      <v-col cols="5" class="music-controllers">
        <v-btn icon @mouseenter="showVolumeController = !showVolumeController" @click="toggleMute"><v-icon >{{ soundToggleIcon }}</v-icon></v-btn>
        <v-slider v-if="showVolumeController" v-model="volume" thumb-label="always" step="1" @change="modifyVolume"></v-slider>
      </v-col>
    </v-row>
</div>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue'

export default {
  setup (_, context) {
  const showVolumeController = ref(false)
  const src = "@/assets/shakira.mp3"
  const audioTag = ref(null)
  const progressValue = ref(0)
  const volume = ref(50)
  const isPlaying = ref(false)
  const isMuted = ref(false)
  const selectedSpeed = ref(1)
  const speeds = [-1, -0.5, 1, 1.5, 2]

  const musicToggleIcon = computed(() => {
    return isPlaying.value ? "mdi-pause" : "mdi-play"
  })

  const soundToggleIcon = computed(() => {
    return isMuted.value ? "mdi-volume-off" : "mdi-volume-high"
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
  function modifyVolume (value) {
    const audio = audioTag.value
    if (volume.value === 0) return audio.muted = true
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
        showVolumeController,
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
  }
}
</script>

<style>
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
