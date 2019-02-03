<template>
  <div id="index">
    <v-container>
      <img @click="goToRoute('/' + champ.id)" v-for="champ in champs" :key="champ.id" :src="'https://ddragon.leagueoflegends.com/cdn/9.2.1/img/champion/' + champ.id + '.png'">
    </v-container>


   <v-layout row justify-center>
    <v-dialog light v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card class="norepeater">
        <v-toolbar absolute dense style="background-color: transparent !important" color="transparent">
          <v-btn icon dark @click="goBack()">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title class="white--text">Matchup Details</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <nuxt-child :key="$route.params.id"></nuxt-child>
      </v-card>
    </v-dialog>
  </v-layout>

    
  </div>
</template>

<script>
export default {
  async asyncData ({$axios}) {
    let champs = await $axios.$get('https://ddragon.leagueoflegends.com/cdn/9.2.1/data/en_US/champion.json')
    return { champs: champs.data }

  },
  data() {
    return {
      dialog: false
    }
  },
  mounted() {
    if(this.$route.params.id) {
      this.dialog = true
    }
  },
  methods: {
    goToRoute(path) {
      this.$router.push(path)
      const imageUrl = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + this.$route.params.id + "_0.jpg"
      this.dialog = true
    },

    goBack() {
      this.$router.push('/')
      this.dialog = false
    }
  }
}
</script>
<style>
.norepeater {
  background-repeat: no-repeat;
  background-size: cover;
}
</style>

