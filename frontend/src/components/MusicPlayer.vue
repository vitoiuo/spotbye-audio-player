<template>
  <v-bottom-navigation height="120" style="position: fixed;">
    <v-row justify="center" align="center" class="mr-2">
      <v-col class="d-flex">
        <v-img
            contain
            height="100px"
            :src="currentSong.cover"
            style="flex-basis: 125px;"
        ></v-img>
        <v-list-item>
          <v-list-item-title>{{ currentSong.title }}</v-list-item-title>
          <v-list-item-subtitle>By {{ currentSong.artist }}</v-list-item-subtitle>
        </v-list-item>
      </v-col>
      <v-spacer></v-spacer>
      <v-col>
        <v-row justify="center">
          <v-btn :class='{"randomizer-btn":random}' @click="triggerRandomizer">
            <v-icon>mdi-dice-3-outline</v-icon>
          </v-btn>
          <v-btn @click="handleSongsQueue(-1)"><v-icon>mdi-skip-previous</v-icon></v-btn>
          <v-btn  @click="toggleMusic"><v-icon>{{ musicToggleIcon }}</v-icon></v-btn>
          <v-btn @click="handleSongsQueue(1)"><v-icon>mdi-skip-next</v-icon></v-btn>
          <v-btn :class='{"looping-btn":loop}' @click="loop = !loop"><v-icon>mdi-repeat</v-icon></v-btn>
          <!-- <v-select 
              v-model="selectedSpeed"
              :items="speeds"
              :menu-props="{ openOnHover: true }"
              @update:modelValue="changeSpeed"
            /> -->
        </v-row>
        <div style="width:500px;">
          <v-slider hide-details color="green" min="0" max="100" :model-value="progressValue" @update:modelValue="controlProgress">
            <template #prepend>{{ formattedTime(audioTag?.currentTime ) }}</template>
            <template #append>{{ formattedTime(audioTag?.duration ) }}</template>
          </v-slider>
        </div>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="2">
        <v-row>
            <v-btn :to="{ name:'playingMusics' }">
              <v-icon>
                mdi-land-rows-horizontal
              </v-icon>
            </v-btn>
            <v-btn @click="toggleMute">
              <v-icon>{{ soundToggleIcon }}</v-icon>
            </v-btn>
            <v-slider v-model="volume" hide-details min="0" max="100" @update:modelValue="modifyVolume"></v-slider>
        </v-row>
      </v-col>
    </v-row>
    <audio 
      ref="audioTag"
      :loop="loop"
      @ended="handleSongsQueue(1)"
      @timeupdate="updateProgress"
      >
      <source type="audio/mpeg" >
      Your browser does not support the audio element.
    </audio>
  </v-bottom-navigation>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useMusicStore } from "@/stores/musicStore"

export default {
  props: {
    songs: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    const musicStore = useMusicStore()
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
    const random = ref(false)

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
    const hasPreviousSong = computed(() => {
      return queuePosition.value !== 0
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
    function triggerRandomizer () {
      random.value = !random.value
      if(random.value) musicStore.shuffleRow()
    }
    function handleSongsQueue (value) {
      const audio = audioTag.value

      if ((value === 1 && !hasNextSong.value) || (value === -1 && !hasPreviousSong.value)) {
         return
      }

      queuePosition.value+=value
      if (currentSong.value) {
        // lembrar do '/media/'
        audio.src = currentSong.value.file
        toggleMusic()
      }
    }
    function formattedTime (value) {
      if (!value) return '0:00'

      let sec_num = parseInt(value, 10);
      let hours   = Math.floor(sec_num / 3600);
      let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      let seconds = sec_num - (hours * 3600) - (minutes * 60);

      if (minutes < 10) {minutes = "0"+minutes;}
      if (seconds < 10) {seconds = "0"+seconds;}
      return +minutes+':'+seconds;
    }

    onMounted(() => {
      //lembrar do '/media/'
      const audio = audioTag.value
      audio.src = currentSong.value.file
      toggleMusic()
    })

    return {
          musicStore,
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
          random,
          queuePosition,
          currentSong,
          hasNextSong,
          hasPreviousSong,
          toggleMute,
          toggleMusic,
          modifyVolume,
          changeSpeed,
          controlProgress,
          updateProgress,
          triggerRandomizer,
          handleSongsQueue,
          formattedTime,
      }
    },
}
</script>

<style>
  .looping-btn, .randomizer-btn {
    color: green;
  }
  .music-controllers {
    display: flex;
    gap: 8px;
  }
  .rotating {
    animation: rotate 5s linear infinite forwards;
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
