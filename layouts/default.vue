<template>
  <v-app dark>
  <v-toolbar>
    <v-toolbar-title><nuxt-link style="color: white" to="/"><b>Ekko Matchup Data Management</b></nuxt-link></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn @click="loginModal = true" flat>Login</v-btn>
    </v-toolbar-items>
  </v-toolbar>

    <nuxt></nuxt>

    <v-layout row justify-center>
    <v-dialog v-model="loginModal" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Editors Login</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>

              <v-flex xs12>
                <v-text-field v-model="modalemail" label="Email*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="modalpassword" label="Password*" type="password" required></v-text-field>
              </v-flex>
    
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="loginModal = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="loginFB()">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      loginModal: false,
      modalemail: "",
      modalpassword: ""
    }
  },
  methods: {
    loginFB () {
      this.$fireAuth.signInWithEmailAndPassword(this.modalemail, this.modalpassword).then(() => {
        this.$toast.show('Logged In', { duration: 4000, theme: 'outline' })
      }).catch(error => {
        alert(error)
      })
    }
  }
}
</script>
