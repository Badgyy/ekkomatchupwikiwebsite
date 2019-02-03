<template>
    <div id="id">



        <div v-if="champ">
            <v-card>
        <v-img
          class="white--text"
          absolute
          height="550px"
          :src="'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/' + $route.params.id + '_0.jpg'"
        ></v-img>

        <v-container>
        
        <v-layout>
            <v-flex xs2>

                <h2>Difficulty</h2>
                <v-select :items="difficulties" label="Difficulty" v-model="champupdated.difficulty"></v-select>

                <h2>Summoners</h2>

                <v-select v-model="champupdated.summs" :items="summs" item-text="name" attach chips label="Summoners" multiple></v-select>
            </v-flex>



            <v-flex xs4 offset-xs2>
            <h2>Items</h2>

                <v-layout row v-for="(item,index) in champupdated.build" :key="index">
                    <v-flex xs4 >
                        <v-autocomplete :items="itemnames" v-model="item.item" outline label="Itemname"></v-autocomplete>
                    </v-flex>


                    <v-flex xs2 >
                        <v-text-field v-model="item.amount" outline label="Amount"></v-text-field>
                    </v-flex>


                     <v-flex xs2 >
                        <v-text-field v-model="item.order" outline label="Order"></v-text-field>
                    </v-flex>
                </v-layout>

                        <v-layout row>
                    <v-flex xs4 >
                        <v-autocomplete :items="itemnames" v-model="newItem.item" outline label="Itemname"></v-autocomplete>
                    </v-flex>


                    <v-flex xs2 >
                        <v-text-field v-model="newItem.amount" outline label="Amount"></v-text-field>
                    </v-flex>


                     <v-flex xs2 >
                        <v-text-field v-model="newItem.order" outline label="Order"></v-text-field>
                    </v-flex>

                    <v-btn @click="AddnewItem()" color="primary">Add</v-btn>
                </v-layout>

            </v-flex>

            <v-flex xs4>
                <h2>Tips</h2>

                <v-list subheader>
                    <v-list-tile v-for="(tip,index) in champupdated.tips" :key="index">
                        <v-list-tile-content>
                            <v-list-tile-title v-html="tip"></v-list-tile-title>
                        </v-list-tile-content>

                        <v-list-tile-action @click="champupdated.tips.splice(index,1)">
                            <v-icon @click="champupdated.tips.splice(index,1)" color="danger">speaker_notes_off</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>

    
                <v-text-field label="New Tip" outline v-model="newTipInput"></v-text-field>
                <v-btn color="primary" @click="newTipPush()">Add Tip </v-btn>
            </v-flex>
        </v-layout>












        






       




        </v-container>
    </v-card> <v-container><v-btn @click="saveChanges()" color="primary">Save Changes</v-btn></v-container>
        </div>
        <div v-else>
            Loading...
        </div>

    </div>
</template>
<script>
import summonerData from '~/assets/summonerData'

export default {
async asyncData ({app, route}) {
    var champdata = []
    await app.$fireStore.collection('matchups').doc(route.params.id.toLowerCase()).get().then(doc => {
        if(doc.exists) {
            champdata = doc.data()
        } 
    })

    return { champ: champdata }
  },
  data() {
      return {
          difficulties: ['Very Easy', 'Easy', 'Standard', 'Hard', 'Very Hard', 'Dodge this'],
          champupdated: [],
          summs: summonerData,
          newTipInput: "",
          itemnames: ['Dorans Ring', 'Dorans Shield', 'Dorans Blade', 'Health Potion', 'Hextech Revolver'],
          newItem: {}
      }
  },
  methods: {
      saveChanges () {
          console.log(this.champupdated)
          this.$fireStore.collection('matchups').doc(this.$route.params.id.toLowerCase()).update({
              ...this.champupdated
          }).then(() => {
              this.$toast.show('Saved', { duration: 4000, theme: 'outline' })
          }).catch(error => {
              this.$toast.show(error, { duration: 4000, theme: 'outline' })
          })
      },
      newTipPush () {
          if(!this.champupdated.tips) this.champ.tips = []
          this.champupdated.tips.push(this.newTipInput)
          this.newTipInput = ""
      },
      AddnewItem() {
          if(!this.champupdated.build) this.champupdated.build = []
          this.champupdated.build.push(this.newItem)
          this.newItem = []
      }
  },
  mounted() {
      this.champupdated = this.champ
  }
}
</script>
