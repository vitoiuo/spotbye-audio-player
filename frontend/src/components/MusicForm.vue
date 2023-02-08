<template>
  <div>
    <v-list-item @click="showPopup" prepend-icon="mdi-music" color="green">Add Music</v-list-item>
    <v-dialog v-model="showForm" @click:outside="cleanForm" max-width="500px">
      <v-card>
        <v-card-title class="headline">Add Music</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field prepend-icon="mdi-format-title" label="Title" v-model="title" :rules="titleRules" />
            <v-text-field prepend-icon="mdi-account-music" label="Artist" v-model="artist" :rules="artistRules" />
            <v-text-field prepend-icon="mdi-image-area" label="Music cover" type="url" v-model="musicCover" :rules="imageRules"/>
            <v-file-input prepend-icon="mdi-soundcloud" label="Music" v-model="music" accept="audio/*" :rules="musicRules" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="submit">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { ref } from 'vue'
import { useAppStore } from "@/stores/appStore"
import songsApi from "@/api/songs.api.js"

export default {
  setup () {
    const form = ref(null)
    const showForm = ref(false)
    const valid = ref(false)
    const title = ref('')
    const artist = ref('')
    const musicCover = ref('')
    const music = ref(null)
    const appStore = useAppStore()

    const titleRules = [
      v => !!v || 'Title is required',
      v => (v && v.length <= 25) || 'Title must be less than 25 characters'
    ]
    const artistRules = [
      v => !!v || 'Artist is required',
      v => (v && v.length <= 25) || 'Artist must be less than 25 characters'
    ]
    const imageRules = [
      v => !!v || 'Music cover is required',
    ]
    const musicRules = [
      v => !!v || 'Music is required'
    ]

    function showPopup () {
        showForm.value = true
    }
    async function submit () {
      if (valid.value) {
        const newSong = {
          title: title.value,
          artist: artist.value,
          cover: musicCover.value,
          file: music.value[0]
        }

        await songsApi.addNewsong(newSong)
        showForm.value = false
        cleanForm()
      }
      else {
        form.value.validate()
      }
    }
    function cleanForm () {
        form.value.reset()
    }

    return {
      appStore,
      showForm,
      form,
      valid,
      title,
      artist,
      musicCover,
      music,
      titleRules,
      artistRules,
      imageRules,
      musicRules,
      showPopup,
      submit,
      cleanForm,
    }
  }
}
</script>