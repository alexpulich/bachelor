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
      <climbingwall-description v-else
                                :climbingwall="climbingwall"
                                :routes="routes"
                                :pictures="pictures"
                                :kinds="kinds">
      </climbingwall-description>
    </b-col>
  </b-row>
</template>

<script>
  import ClimbingwallCard from './climbingwalls/ClimbingwallCard.vue'
  import ClimbingwallDescription from './climbingwalls/ClimbingwallDescription.vue'
  import ClimbingwallEdit from './climbingwalls/ClimbingwallEdit.vue'
  import ClimbingwallEditPics from './climbingwalls/ClimbingwallEditPics.vue'
  import {mapGetters} from 'vuex'

  export default {
    name: 'Climbingwall',
    components: {ClimbingwallCard, ClimbingwallDescription, ClimbingwallEdit, ClimbingwallEditPics},
    computed: {
      climbingwall () {
        if (!(this.$store.getters['climbingwalls/climbingwall'](this.$route.params.id))) {
          this.$store.dispatch('climbingwalls/getClimbingwall', this.$route.params.id)
        }
        return this.$store.getters['climbingwalls/climbingwall'](this.$route.params.id)
      },
      routes () {
        if (!(this.$store.getters['climbingwalls/climbingwall_routes'](this.$route.params.id))) {
          this.$store.dispatch('climbingwalls/getClimbingwallsRoutes', this.$route.params.id)
        }
        return this.$store.getters['climbingwalls/climbingwall_routes'](this.$route.params.id)
      },
      pictures () {
        if (!(this.$store.getters['climbingwalls/pictures'](this.$route.params.id))) {
          this.$store.dispatch('climbingwalls/getPictures', this.$route.params.id)
        }
        return this.$store.getters['climbingwalls/pictures'](this.$route.params.id)
      },
      ...mapGetters('climbingwalls', ['kinds'])
    },
    created() {
      this.$store.dispatch('climbingwalls/getKinds')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .logo {
    max-height: 200px;
  }
</style>
