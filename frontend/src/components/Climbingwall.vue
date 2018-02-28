<template>
  <b-row>
    <b-col sm="4">
      <climbingwall-card></climbingwall-card>
    </b-col>
    <b-col sm="8">
      <climbingwall-description></climbingwall-description>
    </b-col>
  </b-row>
</template>

<script>
  import ClimbingwallCard from './climbingwalls/ClimbingwallCard.vue'
  import ClimbingwallDescription from './climbingwalls/ClimbingwallDescription.vue'

  export default {
    name: 'Climbingwall',
    components: {ClimbingwallCard, ClimbingwallDescription},
    created() {
      this.$store.dispatch('getClimbingwallsRoutes', this.$route.params.id)
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .logo {
    max-height: 200px;
  }
</style>
