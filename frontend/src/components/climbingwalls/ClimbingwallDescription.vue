<template>
  <div class="shadow bg-white p-4 border rounded">
    <h2>
      <small><a href="#" v-on:click.prevent="toggleIsEditding"><i class="fa" :class="{'fa-edit':!isEditing, 'fa-arrow-left': isEditing}"></i></a></small>
      {{ title }}
    </h2>
    <climbingwall-edit v-if="isEditing"
                       :is-editing="isEditing"
                       :climbingwall="climbingwall">
    </climbingwall-edit>
    <div v-else>
      <p v-text="climbingwall.description"></p>
      <routes-table :routes="routes" :users="users" :climbingwall="climbingwall">
      </routes-table>
      <hr>
      <add-route v-if="isLoggedIn"></add-route>
    </div>
  </div>
</template>

<script>

  import {mapGetters} from 'vuex'
  import RoutesTable from './RoutesTable.vue'
  import AddRoute from './AddRoute.vue'
  import ClimbingwallEdit from './ClimbingwallEdit.vue'

  export default {
    name: 'ClimbingwallDescription',
    components: {RoutesTable, AddRoute, ClimbingwallEdit},
    props: ['climbingwall', 'routes', 'users'],
    data() {
      return {
        isEditing: false
      }
    },
    computed: {
      title() {
        return this.isEditing ? 'Редактирование скалодрома "' + this.climbingwall.name + '"' : 'О скалодроме';
      },
      ...mapGetters(['isLoggedIn']),
    },
    methods: {
      toggleIsEditding() {
        this.isEditing = !this.isEditing;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .logo {
    max-height: 200px;
  }
</style>
