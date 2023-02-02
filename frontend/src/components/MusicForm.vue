Here's an example of how to implement a popup with a form to register musics with a file input in Vuetify 3:

<template>
  <div>
    <v-btn @click="showPopup" color="green">Add Music</v-btn>
    <v-dialog v-model="showForm" max-width="500px">
      <v-card>
        <v-card-title class="headline">Add Music</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" @click:outside="cleanForm">
            <v-text-field label="Title" v-model="title" :rules="titleRules" />
            <v-text-field label="Artist" v-model="artist" :rules="artistRules" />
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

export default {
  setup () {
    const form = ref(null)
    const showForm = ref(false)
    const valid = ref(false)
    const title = ref('')
    const artist = ref('')
    const music = ref(null)

    const titleRules = [
      v => !!v || 'Title is required',
      v => (v && v.length <= 25) || 'Title must be less than 25 characters'
    ]
    const artistRules = [
      v => !!v || 'Artist is required',
      v => (v && v.length <= 25) || 'Artist must be less than 25 characters'
    ]
    const musicRules = [
      v => !!v || 'Music is required'
    ]

    function showPopup () {
        showForm.value = true
    }
    function submit () {
      if (valid.value) {
        console.log('hahahaha')
      }
    }
    function cleanForm () {
        form.reset();
    }

    return {
      showForm,
      form,
      valid,
      title,
      artist,
      music,
      titleRules,
      artistRules,
      musicRules,
      showPopup,
      submit,
      cleanForm,
    }
  }
}
</script>