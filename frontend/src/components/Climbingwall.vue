<template>
  <b-row>
    <b-col sm="4">
      <climbingwall-card :climbingwall="climbingwall"></climbingwall-card>
    </b-col>
    <b-col sm="8">
      <climbingwall-description :climbingwall="climbingwall" :routes="routes"></climbingwall-description>
    </b-col>
  </b-row>
</template>

<script>
  import {Climbingwalls} from '../api/climbingwalls'
  import ClimbingwallCard from './climbingwalls/ClimbingwallCard.vue'
  import ClimbingwallDescription from './climbingwalls/ClimbingwallDescription.vue'

  export default {
    name: 'Climbingwall',
    components: {ClimbingwallCard, ClimbingwallDescription},
    data() {
      return {
        climbingwall: {},
        routes: [],
      }
    },

    created() {
      Climbingwalls.item(this.$route.params.id).then(response => (this.climbingwall = response)),
        Climbingwalls.routes(this.$route.params.id).then(response => (this.routes = response))
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .logo {
    max-height: 200px;
  }
</style>
