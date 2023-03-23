<template>
    <v-navigation-drawer
      expand-on-hover
      rail
    >
      <v-list>
        <v-list-item
          prepend-avatar="https://camo.githubusercontent.com/3aeb91675216e39812d2b8b63dc306ff8b76a058bede7f89a135a1a60b774251/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f7468756d622f312f31392f53706f746966795f6c6f676f5f776974686f75745f746578742e7376672f3230343870782d53706f746966795f6c6f676f5f776974686f75745f746578742e7376672e706e67"
          title="SpotBye"
          subtitle="Bye to stress."
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-home-minus-outline"
          title="Início"
          :to="{ name:'base-home' }"
        >
        </v-list-item>
        <v-list-item
          prepend-icon="mdi-magnify"
          title="Buscar"
        >
        </v-list-item>
        <v-list-item
          prepend-icon="mdi-heart"
          title="Favoritos"
          :to="{ name:'favoritos' }"
        >
        </v-list-item>
        <music-form />
        <v-list-item
          prepend-icon="mdi-playlist-plus"
          title="Add playlist"
          :to="{ name:'addPlaylist' }">
        </v-list-item>
        <v-list-item
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          title="Change theme"
          @click.stop="themeClick">
        </v-list-item>
        <v-list-item
          :prepend-icon="theme === 'light' ? 'mdi-account-arrow-left' : 'mdi-account-arrow-left-outline'"
          title="Logout"
          :to="{name:'accounts-logout'}"
          @click.stop="logout">
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
import MusicForm from "@/components/MusicForm.vue"
import LogoutView from "@/views/accounts/LogoutView.vue";

export default {
  components: {
    MusicForm
  },
  props: {
    title: {
      type: String,
      required: false,
      default: "SpotBye",
    },
    theme: {
      type: String,
      required: true,
      default: "dark",
    },
  },
  emits: ["themeClick"],
  data: () => {
    return {}
  },
  methods: {
    themeClick() {
      this.$emit("themeClick")
    },
  },
}
</script>
