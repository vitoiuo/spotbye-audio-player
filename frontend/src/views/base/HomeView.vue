<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
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
        <v-row>
          <music-form></music-form>
        </v-row>
      </v-container>
    </v-responsive>
  </v-container>
</template>

<script>
import MusicForm from "@/components/MusicForm.vue"
import { mapState } from "pinia"
import { useAccountsStore } from "@/stores/accountsStore"

export default {
  name: 'HomeView',
  components: {
    MusicForm,
  },
  setup () {
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

  return {
        musics
      }
  }
}
</script>
