<template>
   <div>
    <v-row>
      <h5 class="text-h5 font-weight-bold">Your songs</h5>
      <v-spacer></v-spacer>
      <span class="caption grey--text mr-2">SEE ALL</span>
    </v-row>
    <v-row class="mt-5">
      <v-card v-for="music in apiMusics.songs" :key="music.title" rounded class="shadow-on-hover ma-2" @click="musicChoosed(music)">
        <v-img :src="music.cover" height="145" width="145" class="mx-4 mt-4"></v-img>
        <v-card-title>{{music.title}}</v-card-title>
        <v-card-subtitle class="mb-6">{{music.artist}}</v-card-subtitle>
      </v-card>
    </v-row>

    <v-row class="mt-12">
      <v-col class="pa-0">
        <h5 class="text-h5 font-weight-bold mb-1">Made for SageModeBoy</h5>
      </v-col>
      <v-spacer></v-spacer>
      <span class="caption grey--text mr-2">SEE ALL</span>
    </v-row>
    <v-row class="mt-12">
      <v-card
        v-for="music in apiMusics.songs"
        :key="music.title"
        min-width="360"
      >
        <div class="d-flex justify-between">
          <v-card-title class="flex-grow-1 flex-column align-start">
            <div class="text-h5">
              {{ music.title }}
            </div>
            <div class="text-h6 font-weight-thin">{{ music.artist }}</div>
          </v-card-title>
          <v-img
            contain
            height="125px"
            :src="music.cover"
            style="flex-basis: 125px"
            class="flex-grow-0"
          ></v-img>
        </div>

        <v-divider></v-divider>

        <v-card-actions class="pa-4">
          Rate this music
          <v-spacer></v-spacer>
          <span class="text-grey text-caption me-2">
            ({{ rating }})
          </span>

          <v-rating
            v-model="rating"
            color="green"
            active-color="green"
            half-increments
            hover
            size="18"
          ></v-rating>
        </v-card-actions>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import { useMusicStore } from "@/stores/musicStore"
import { ref, onMounted } from 'vue'
import songsApi from "@/api/songs.api.js"


export default {
  setup () {
    const musicStore = useMusicStore()
    const apiMusics = ref([])
    const rating = ref(0)
    // const musics = [
    //     {
    //       id: 1,
    //       title: 'Shape of You',
    //       artist: 'Ed Sheeran',
    //       cover: 'https://www.lance.com.br/files/article_main/uploads/2023/01/19/63c981f97f2aa.jpeg',
    //       file_path: '/src/assets/shakira.mp3'
    //     },
    //     {
    //       id: 2,
    //       title: 'Sugar',
    //       artist: 'Maroon 5',
    //       cover: 'https://s2.glbimg.com/0vAniTngQ2r8fNIq2p7eT-zvjVE=/0x0:1080x1350/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2022/T/b/BTZPHrSBufgvYJsRpayA/shakira-280155891-188638093488887-4569557496906173603-n.jpg',
    //       file_path: '/src/assets/shakira.mp3'
    //     },
    //     {
    //       id: 3,
    //       title: 'Uptown Funk',
    //       artist: 'Mark Ronson ft. Bruno Mars',
    //       cover: 'https://www.lance.com.br/files/article_main/uploads/2023/01/19/63c981f97f2aa.jpeg',
    //       file_path: '/src/assets/shakira.mp3'
    //     },
    //     {
    //       id: 4,
    //       title: 'Shape of You',
    //       artist: 'Ed Sheeran',
    //       cover: 'https://s2.glbimg.com/0vAniTngQ2r8fNIq2p7eT-zvjVE=/0x0:1080x1350/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2022/T/b/BTZPHrSBufgvYJsRpayA/shakira-280155891-188638093488887-4569557496906173603-n.jpg',
    //       file_path: '/src/assets/shakira.mp3'
    //     },
    //     {
    //       id: 5,
    //       title: 'Shape of You',
    //       artist: 'Ed Sheeran',
    //       cover: 'https://www.lance.com.br/files/article_main/uploads/2023/01/19/63c981f97f2aa.jpeg',
    //       file_path: '/src/assets/shakira.mp3'
    //     },
    //     {
    //       id: 6,
    //       title: 'Shape of You',
    //       artist: 'Ed Sheeran',
    //       cover: 'https://www.lance.com.br/files/article_main/uploads/2023/01/19/63c981f97f2aa.jpeg',
    //       file_path: '/src/assets/shakira.mp3'
    //     },
    //     {
    //       id: 7,
    //       title: 'Shape of You',
    //       artist: 'Ed Sheeran',
    //       cover: 'https://www.lance.com.br/files/article_main/uploads/2023/01/19/63c981f97f2aa.jpeg',
    //       file_path: '/src/assets/shakira.mp3'
    //     },
    //     {
    //       id: 8,
    //       title: 'Sugar',
    //       artist: 'Maroon 5',
    //       cover: 'https://www.lance.com.br/files/article_main/uploads/2023/01/19/63c981f97f2aa.jpeg',
    //       file_path: '/src/assets/shakira.mp3'
    //     },
    //   ]

    async function getAPIMusics () {
      apiMusics.value = await songsApi.getSongs()
    }

    onMounted(async () => {
      await getAPIMusics()
    })

    return { musicStore, apiMusics, rating }
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