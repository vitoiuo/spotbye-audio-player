<template>
  <v-row>
    <v-col @click="musicChoosed(music)" v-for="music in musics" :key="music.id" cols="12" md="4">
        <v-card class="pa-2">
            <v-img
              :src="music.cover"
              aspect-ratio="2"
            ></v-img>
            <v-card-title>{{ music.title }}</v-card-title>
            <v-card-subtitle>{{ music.artist }}</v-card-subtitle>
        </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { useMusicStore } from "@/stores/musicStore"

export default {
  setup () {
    const musicStore = useMusicStore()
    const musics = [
        {
          id: 1,
          title: 'Shape of You',
          artist: 'Ed Sheeran',
          cover: 'https://www.lance.com.br/files/article_main/uploads/2023/01/19/63c981f97f2aa.jpeg'
        },
        {
          id: 2,
          title: 'Sugar',
          artist: 'Maroon 5',
          cover: 'https://www.lance.com.br/files/article_main/uploads/2023/01/19/63c981f97f2aa.jpeg'
        },
        {
          id: 3,
          title: 'Uptown Funk',
          artist: 'Mark Ronson ft. Bruno Mars',
          cover: 'https://www.lance.com.br/files/article_main/uploads/2023/01/19/63c981f97f2aa.jpeg'
        },
        {
          id: 4,
          title: 'Shape of You',
          artist: 'Ed Sheeran',
          cover: 'https://www.lance.com.br/files/article_main/uploads/2023/01/19/63c981f97f2aa.jpeg'
        },
        {
          id: 5,
          title: 'Shape of You',
          artist: 'Ed Sheeran',
          cover: 'https://www.lance.com.br/files/article_main/uploads/2023/01/19/63c981f97f2aa.jpeg'
        },
        {
          id: 6,
          title: 'Shape of You',
          artist: 'Ed Sheeran',
          cover: 'https://www.lance.com.br/files/article_main/uploads/2023/01/19/63c981f97f2aa.jpeg'
        },
        {
          id: 7,
          title: 'Shape of You',
          artist: 'Ed Sheeran',
          cover: 'https://www.lance.com.br/files/article_main/uploads/2023/01/19/63c981f97f2aa.jpeg'
        },
        {
          id: 8,
          title: 'Sugar',
          artist: 'Maroon 5',
          cover: 'https://www.lance.com.br/files/article_main/uploads/2023/01/19/63c981f97f2aa.jpeg'
        },
      ]

    return { musics, musicStore }
  },
  methods: {
    musicChoosed(newMusic) {
      this.musicStore.setMusicInRow(newMusic)
    }
  }
}
</script>

<style>

</style>