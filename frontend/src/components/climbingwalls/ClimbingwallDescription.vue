<template>
  <div class="shadow bg-white p-4 border rounded">
    <h2>О скалодроме</h2>
    <p v-text="climbingwall.description"></p>
    <routes-table></routes-table>
    <hr>
    <add-route v-if="isLoggedIn"></add-route>
  </div>
</template>

<script>

  import {mapGetters} from 'vuex'
  import RoutesTable from './RoutesTable.vue'
  import AddRoute from './AddRoute.vue'
  export default {
    name: 'ClimbingwallDescription',
    components: {RoutesTable, AddRoute},
    computed: {
      climbingwall() {
        return this.$store.getters.climbingwall(this.$route.params.id)
      },
      ...mapGetters(['isLoggedIn'])
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .logo {
    max-height: 200px;
  }
</style>
