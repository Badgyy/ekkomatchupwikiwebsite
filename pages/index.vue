<template>
  <div id="index">
    <v-container>
      <img @click="goToRoute('/vschamp/' + champ.id)" v-for="champ in champs" :key="champ.id" :src="'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/' + champ.id + '.png'">
    </v-container>
  </div>
</template>

<script>
export default {
  async asyncData ({$axios}) {
    let champs = await $axios.$get('http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json')
    return { champs: champs.data }

  },
  methods: {
    goToRoute(path) {
      this.$router.push(path)
    }
  }
}
</script>
