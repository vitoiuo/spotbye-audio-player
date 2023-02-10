<template>
  <div>
    <v-list-item prepend-icon="mdi-music" color="green" title="Add Music" @click="showPopup" ></v-list-item>
    <v-dialog v-model="showForm" max-width="500px" @click:outside="cleanForm">
      <v-card class="pa-5">
        <v-card-title class="headline">Add Music</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field v-model="title" prepend-icon="mdi-format-title" label="Title" :rules="titleRules" />
            <v-text-field v-model="artist" prepend-icon="mdi-account-music" label="Artist" :rules="artistRules" />
            <v-text-field v-model="musicCover" prepend-icon="mdi-image-area" label="Music cover" type="url" :rules="imageRules"/>
            <v-file-input v-model="music" prepend-icon="mdi-soundcloud" label="Music" accept="audio/*" :rules="musicRules" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="green" @click="submit">Submit</v-btn>
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