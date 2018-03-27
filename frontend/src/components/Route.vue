<template>
  <b-row v-if="route">
    <b-col sm="4">
      <route-card :route="route" :kinds="kinds"></route-card>
    </b-col>
    <b-col sm="8" v-if="this.$route.name == 'RouteEdit'">
      <route-edit :route="route" :kinds="kinds"></route-edit>
    </b-col>
    <b-col sm="8" v-else-if="this.$route.name == 'RouteEditPics'">
      <route-edit-pics :route="route" :pictures="pictures"></route-edit-pics>
    </b-col>
    <b-col sm="8" v-else>
      <route-description :route="route" :pictures="pictures"></route-description>
    </b-col>
  </b-row>
</template>

<script>
  import { Routes } from '../api/routes'
  import RouteCard from './routes/RouteCard.vue'
  import RouteDescription from './routes/RouteDescription.vue'
  import RouteEdit from './routes/RouteEdit.vue'
  import RouteEditPics from './routes/RouteEditPics.vue'

  export default {
    name: 'Route',
    components: {RouteCard, RouteDescription, RouteEdit, RouteEditPics},
    computed: {
      route () {
        return this.$store.getters['routes/route'](this.$route.params.id)
      },
      kinds () {
        return this.$store.getters['climbingwalls/kinds']
      },
      pictures () {
        return this.$store.getters['routes/pictures'](this.$route.params.id)
      },
    },
    created () {
      this.$store.dispatch('climbingwalls/getKinds')
      this.$store.dispatch('routes/getRoute', this.$route.params.id)
      this.$store.dispatch('routes/getPictures', this.$route.params.id)
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
