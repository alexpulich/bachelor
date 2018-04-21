<template>
  <b-row v-if="climbingwall">
    <b-col sm="4">
      <climbingwall-card :climbingwall="climbingwall">
      </climbingwall-card>
    </b-col>
    <b-col sm="8">
      <climbingwall-edit v-if="this.$route.name == 'ClimbingwallEdit'"
                         :climbingwall="climbingwall"
                          :kinds="kinds">
      </climbingwall-edit>
      <climbingwall-edit-pics v-else-if="this.$route.name == 'ClimbingwallEditPics'"
                             :climbingwall="climbingwall"
                              :pictures="pictures">
      </climbingwall-edit-pics>
      <competition v-else-if="this.$route.name == 'Competition'"></competition>
      <add-results v-else-if="this.$route.name == 'AddResults'" :climbingwall="climbingwall"></add-results>
      <climbingwall-description v-else
                                :climbingwall="climbingwall"
                                :routes="routes"
                                :pictures="pictures"
                                :kinds="kinds"
                                :competitions="competitions">
      </climbingwall-description>
    </b-col>
  </b-row>
</template>

<script>
  import ClimbingwallCard from './climbingwalls/ClimbingwallCard.vue'
  import ClimbingwallDescription from './climbingwalls/ClimbingwallDescription.vue'
  import ClimbingwallEdit from './climbingwalls/ClimbingwallEdit.vue'
  import ClimbingwallEditPics from './climbingwalls/ClimbingwallEditPics.vue'
  import Competition from './climbingwalls/Competition.vue'
  import AddResults from './climbingwalls/AddResults.vue'
  import {mapGetters} from 'vuex'

  export default {
    name: 'Climbingwall',
    components: {ClimbingwallCard, ClimbingwallDescription, ClimbingwallEdit, ClimbingwallEditPics, Competition, AddResults},
    computed: {
      climbingwall () {
        return this.$store.getters['climbingwalls/climbingwall'](this.$route.params.id)
      },
      routes () {
        return this.$store.getters['climbingwalls/climbingwall_routes'](this.$route.params.id)
      },
      pictures () {
        return this.$store.getters['climbingwalls/pictures'](this.$route.params.id)
      },
      competitions () {
        return this.$store.getters['climbingwalls/competitions'](this.$route.params.id)
      },
      ...mapGetters('climbingwalls', ['kinds'])
    },
    created() {
      this.$store.dispatch('climbingwalls/getKinds')
      this.$store.dispatch('climbingwalls/getClimbingwall', this.$route.params.id)
      this.$store.dispatch('climbingwalls/getClimbingwallsRoutes', this.$route.params.id)
      this.$store.dispatch('climbingwalls/getPictures', this.$route.params.id)
      this.$store.dispatch('climbingwalls/getCompetitions', this.$route.params.id)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .logo {
    max-height: 200px;
  }
</style>
