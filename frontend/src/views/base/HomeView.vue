<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-container>
        <music-list/>
      </v-container>
    </v-responsive>
  </v-container>
</template>

<script>
import MusicForm from "@/components/MusicForm.vue"
import MusicList from "@/components/MusicList.vue"
import { useAppStore } from "@/stores/appStore"

export default {
  name: 'HomeView',
  components: {
    MusicForm,
    MusicList,
  },
}
</script>
