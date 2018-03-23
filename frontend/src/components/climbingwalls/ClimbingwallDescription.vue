<template>
  <div class="shadow bg-white p-4 border rounded" v-if="climbingwall">
    <h2>
      <small>
        <router-link :to="{ name: 'ClimbingwallEdit', params: { id: climbingwall.id }}"><i class="fa fa-edit"></i>
        </router-link>
      </small>
      О скалодроме
    </h2>
    <p v-text="climbingwall.description"></p>
    <routes-table :routes="routes" :climbingwall="climbingwall">
    </routes-table>
    <hr>
    <add-route v-if="isLoggedIn"></add-route>
  </div>
  <!--</div>-->
</template>

<script>

  import { mapGetters } from 'vuex'
  import RoutesTable from './RoutesTable.vue'
  import AddRoute from './AddRoute.vue'
  import ClimbingwallEdit from './ClimbingwallEdit.vue'

  export default {
    name: 'ClimbingwallDescription',
    components: {RoutesTable, AddRoute, ClimbingwallEdit},
    props: ['climbingwall', 'routes', 'VueGallery'],
    computed: {
      ...mapGetters(['isLoggedIn']),
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .logo {
    max-height: 200px;
  }
</style>
