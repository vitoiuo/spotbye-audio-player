<template>
    <v-container>
      <v-row align="center" class="mt-10" no-gutters>
        <v-col cols="12" sm="6" offset-sm="3">
          <v-sheet class="pa-2"> <h1>Cadastrar Novo Usuário</h1> </v-sheet>
          <v-form>
            <v-text-field
              v-model="username"
              label="E-Mail"
              prepend-inner-icon="mdi-email-fast-outline"
              variant="outlined"
              required
              @keyup.enter="cadastrar"></v-text-field>
  
            <v-text-field
              v-model="password"
              type="password"
              label="Password"
              prepend-inner-icon="mdi-key-outline"
              variant="outlined"
              required
              @keyup.enter="cadastrar"></v-text-field>
  
            <v-btn
              block
              size="large"
              rounded="pill"
              color="green"
              append-icon="mdi-chevron-right"
              :to="{ name: 'accounts-login' }"
              @click="cadastrar">
              Cadastrar
            </v-btn>
            <v-btn
              class="my-2"
              block
              size="large"
              rounded="pill"
              color="green"
              variant="outlined"
              :to="{ name: 'accounts-login'}">
              Voltar para o login
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { mapState } from "pinia"
  import AccountsApi from "@/api/accounts.api.js"
  import { useAppStore } from "@/stores/appStore"
  import { useAccountsStore } from "@/stores/accountsStore"
import router from "@/router"
  
  export default {
    setup() {
      const appStore = useAppStore()
      const accountsStore = useAccountsStore()
      return { appStore, accountsStore }
    },
    data: () => {
      return {
        loading: false,
        valid: false,
        username: "",
        password: "",
        error: false,
        visible: false,
      }
    },
    computed: {
      ...mapState(useAccountsStore, ["loggedUser"]),
    },
    mounted() {
      console.log(this.loggedUser)
      AccountsApi.whoami().then((response) => {
        if (response.authenticated) {
          this.saveLoggedUser(response.user)
          this.$router.push({name: 'base-home'})
          this.showTasks()
        }
      })
    },
    methods: {
      cadastrar() {
        this.loading = true
        AccountsApi.cadastrar(this.username, this.password)
          .then((response) => {
            if (!response) {
              this.appStore.showSnackbar("Usuário ou senha invalida", "danger")
              return
            }
            this.saveLoggedUser(response.user)
            this.showTasks()
          })
          .finally(() => {
            this.loading = false
          })
      },
      saveLoggedUser(user) {
        this.error = !user
        if (user) {
          this.accountsStore.setLoggedUser(user)
        }
      },
    },
  }
  </script>
  