<template>
  <div class="shadow bg-white p-4 border rounded" v-if="user">
    <h2>
      <small>
        <router-link :to="{ name: 'ProfileEdit' }"><i class="fa fa-edit"></i>
        </router-link>
      </small>
      Обо мне
    </h2>
    <p v-text="user.description"></p>
    <h2>Мои трассы</h2>
    <routes-table :routes="routes" :kinds="kinds">
    </routes-table>
    <hr>
  </div>
  <!--</div>-->
</template>

<script>

  import { mapGetters } from 'vuex'
  import RoutesTable from '../climbingwalls/RoutesTable.vue'
//  import AddRoute from './AddRoute.vue'
//  import ClimbingwallEdit from './ClimbingwallEdit.vue'
//  import SliderGallery from '../blocks/SliderGallery.vue'

  export default {
    name: 'ProfileDescription',
    components: {RoutesTable},
//    components: {RoutesTable, AddRoute, ClimbingwallEdit, SliderGallery},
    props: ['user', 'routes', 'kinds'],
    computed: {
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .logo {
    max-height: 200px;
  }
</style>
