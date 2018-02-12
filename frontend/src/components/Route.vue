<template>
  <b-row>
    <b-col sm="5">
      <route-card :route="route"></route-card>
    </b-col>
    <b-col sm="7">
    </b-col>
  </b-row>
</template>

<script>
  import {Routes} from '../api/routes'
  import RouteCard from './routes/RouteCard.vue'

  export default {
    name: 'Route',
    components: {RouteCard},
    data() {
      return {
        route: {}
      }
    },
    created() {
      Routes.item(this.$route.params.id).then(response => (this.route = response))
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
