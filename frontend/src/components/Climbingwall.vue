<template>
  <b-row v-if="climbingwall">
    <b-col sm="4">
      <climbingwall-card :climbingwall="climbingwall">
      </climbingwall-card>
    </b-col>
    <b-col sm="8">
      <climbingwall-edit v-if="this.$route.name == 'ClimbingwallEdit'"
                         :climbingwall="climbingwall">
      </climbingwall-edit>
      <climbingwall-description v-else
                                :climbingwall="climbingwall"
                                :routes="routes">
      </climbingwall-description>
    </b-col>
  </b-row>
</template>

<script>
  import ClimbingwallCard from './climbingwalls/ClimbingwallCard.vue'
  import ClimbingwallDescription from './climbingwalls/ClimbingwallDescription.vue'
  import ClimbingwallEdit from './climbingwalls/ClimbingwallEdit.vue'

  export default {
    name: 'Climbingwall',
    components: {ClimbingwallCard, ClimbingwallDescription, ClimbingwallEdit},
    computed: {
      climbingwall () {
        if (!(this.$store.getters.climbingwall(this.$route.params.id))) {
          this.$store.dispatch('getClimbingwall', this.$route.params.id)
        }
        return this.$store.getters.climbingwall(this.$route.params.id)
      },
      routes () {
        if (!(this.$store.getters.climbingwall_routes(this.$route.params.id))) {
          this.$store.dispatch('getClimbingwallsRoutes', this.$route.params.id)
        }
        return this.$store.getters.climbingwall_routes(this.$route.params.id)
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .logo {
    max-height: 200px;
  }
</style>
