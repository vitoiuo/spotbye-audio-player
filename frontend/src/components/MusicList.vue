<template>
  <v-row>
    <v-col @click="musicChoosed(music)" v-for="music in musics" :key="music.id" cols="12" md="4">
        <v-card 
          class="shadow-on-hover pa-2" 
          @mouseover="hover = true"
          @mouseout="hover = false">
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
import { ref, onMounted } from 'vue'
import songsApi from "@/api/songs.api"


export default {
  setup () {
    const musicStore = useMusicStore()
    const apiMusics = ref([])
    const musics = [
        {
          id: 1,
          title: 'Shape of You',
          artist: 'Ed Sheeran',
          cover: 'https://www.lance.com.br/files/article_main/uploads/2023/01/19/63c981f97f2aa.jpeg',
          file_path: '/src/assets/shakira.mp3'
        },
        {
          id: 2,
          title: 'Sugar',
          artist: 'Maroon 5',
          cover: 'https://s2.glbimg.com/0vAniTngQ2r8fNIq2p7eT-zvjVE=/0x0:1080x1350/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2022/T/b/BTZPHrSBufgvYJsRpayA/shakira-280155891-188638093488887-4569557496906173603-n.jpg',
          file_path: '/src/assets/shakira.mp3'
        },
        {
          id: 3,
          title: 'Uptown Funk',
          artist: 'Mark Ronson ft. Bruno Mars',
          cover: 'https://www.lance.com.br/files/article_main/uploads/2023/01/19/63c981f97f2aa.jpeg',
          file_path: '/src/assets/shakira.mp3'
        },
        {
          id: 4,
          title: 'Shape of You',
          artist: 'Ed Sheeran',
          cover: 'https://s2.glbimg.com/0vAniTngQ2r8fNIq2p7eT-zvjVE=/0x0:1080x1350/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2022/T/b/BTZPHrSBufgvYJsRpayA/shakira-280155891-188638093488887-4569557496906173603-n.jpg',
          file_path: '/src/assets/shakira.mp3'
        },
        {
          id: 5,
          title: 'Shape of You',
          artist: 'Ed Sheeran',
          cover: 'https://www.lance.com.br/files/article_main/uploads/2023/01/19/63c981f97f2aa.jpeg',
          file_path: '/src/assets/shakira.mp3'
        },
        {
          id: 6,
          title: 'Shape of You',
          artist: 'Ed Sheeran',
          cover: 'https://www.lance.com.br/files/article_main/uploads/2023/01/19/63c981f97f2aa.jpeg',
          file_path: '/src/assets/shakira.mp3'
        },
        {
          id: 7,
          title: 'Shape of You',
          artist: 'Ed Sheeran',
          cover: 'https://www.lance.com.br/files/article_main/uploads/2023/01/19/63c981f97f2aa.jpeg',
          file_path: '/src/assets/shakira.mp3'
        },
        {
          id: 8,
          title: 'Sugar',
          artist: 'Maroon 5',
          cover: 'https://www.lance.com.br/files/article_main/uploads/2023/01/19/63c981f97f2aa.jpeg',
          file_path: '/src/assets/shakira.mp3'
        },
      ]

    async function getAPIMusics () {
      apiMusics.value = await songsApi.getSongs()
    }

    onMounted(async () => {
      await getAPIMusics()
    })

    return { musics, musicStore, apiMusics }
  },
  methods: {
    musicChoosed(newMusic) {
      this.musicStore.setMusicInRow(newMusic)
    }
  }
}
</script>

<style>
.shadow-on-hover:hover {
  background-color: green;
  box-shadow: 0 10px 15px -3px green,
    0 4px 6px -2px darkgreen;
}
</style>