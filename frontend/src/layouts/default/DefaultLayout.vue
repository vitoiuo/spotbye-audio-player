<template>
  <VLayout>
    <app-error-dialog :show="showErrorMessage" :message="errorMessage" @close="closeErrorDialog" />
    <app-snackbar />
    <v-app :theme="theme">
      <app-nav-bar :theme="theme" @theme-click="onThemeClick"></app-nav-bar>
        <RouterView />
        <music-player v-if="musicRow.length" class="p-5" :songs="musicRow" @close-player="clearSongs"></music-player>
    </v-app>
  </VLayout>
</template>

<script setup>
import { ref } from "vue"
import { useMusicStore } from "@/stores/musicStore"

const theme = ref("dark")

function onThemeClick() {
  theme.value = theme.value === "light" ? "dark" : "light"
}
</script>

<script>
import { mapState } from "pinia"
import { useAppStore } from "@/stores/appStore"
import { useAccountsStore } from "@/stores/accountsStore"
import AppSnackbar from "@/components/AppSnackbar.vue"
import AppErrorDialog from "@/components/AppErrorDialog.vue"
import AppNavBar from "@/components/AppNavBar.vue"
import MusicPlayer from "@/components/MusicPlayer.vue"

export default {
  name: "DefaultLayout",
  components: {
    AppSnackbar,
    AppErrorDialog,
    AppNavBar,
    MusicPlayer,
  },
  setup() {
    const appStore = useAppStore()
    const musicStore = useMusicStore()
    return { appStore, musicStore }
  },
  computed: {
    ...mapState(useAppStore, ["errorMessage", "showErrorMessage"]),
    ...mapState(useAccountsStore, ["loggedUser"]),
    ...mapState(useMusicStore, ["musicRow"]),
  },
  methods: {
    closeErrorDialog() {
      this.appStore.setShowErrorMessage(null)
    },
    clearSongs () {
      this.musicStore.clearRow()
    }
  },
}
</script>
