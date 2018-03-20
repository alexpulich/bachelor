<template>
  <b-row>
    <b-col sm="4">
      <route-card :route="route"></route-card>
    </b-col>
    <b-col sm="8">
      <route-description :route="route"></route-description>
    </b-col>
  </b-row>
</template>

<script>
  import {Routes} from '../api/routes'
  import RouteCard from './routes/RouteCard.vue'
  import RouteDescription from './routes/RouteDescription.vue'

  export default {
    name: 'Route',
    components: {RouteCard, RouteDescription},
    computed: {
      route() {
        if (!(this.$store.getters.route(this.$route.params.id))) {
          this.$store.dispatch('getRoute', this.$route.params.id)
        }
        return this.$store.getters.route(this.$route.params.id)
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
