<template>
  <div class="shadow bg-white p-4 border rounded">
    <h2>
      <small><a href="#" v-on:click.prevent="toggleIsEditding"><i class="fa"
                                                                  :class="{'fa-edit':!isEditing, 'fa-arrow-left': isEditing}"></i></a>
      </small>
      {{ title }}
    </h2>
    <climbingwall-edit v-if="isEditing"
                       :is-editing="isEditing"
                       :climbingwall="climbingwall">
    </climbingwall-edit>
    <div v-else>
      <p v-text="climbingwall.description"></p>
      <!--<gallery v-if="images" :images="images" :index="index" @close="index = null"></gallery>-->
      <!--<div v-if="images" class="row mb-4">-->
        <!--<div-->
          <!--class="col-sm-3"-->
          <!--v-for="image, imageIndex in images"-->
          <!--@click="index = imageIndex"-->
        <!--&gt;-->
          <!--<img class="img-fluid img-thumbnail" :src="image" alt="">-->
        <!--</div>-->
      <!--</div>-->
      <routes-table :routes="routes" :climbingwall="climbingwall">
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
    props: ['climbingwall', 'routes', 'VueGallery'],
    data() {
      return {
        isEditing: false,
        images: [
          'https://dummyimage.com/800/ffffff/000000',
          'https://dummyimage.com/1600/ffffff/000000',
          'https://dummyimage.com/1280/000000/ffffff',
          'https://dummyimage.com/400/000000/ffffff'
        ],
        index: null,
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
