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
    <h2>
      <small>
        <router-link :to="{ name: 'ClimbingwallEditPics', params: { id: climbingwall.id }}">
          <i class="fa fa-edit"></i>
        </router-link>
      </small>
      Фотографии
    </h2>
    <slider-gallery v-if="images.length" :images="images"></slider-gallery>
    <div class="alert alert-primary" v-else>
      Фотографий пока нет :( Вы можете добавить их
      <router-link :to="{ name: 'ClimbingwallEditPics', params: { id: climbingwall.id }}">здесь</router-link>
    </div>
    <routes-table :routes="routes" :climbingwall="climbingwall" :kinds="kinds">
    </routes-table>
    <hr>
    <add-route v-if="isLoggedIn" :kinds="kinds"></add-route>
  </div>
  <!--</div>-->
</template>

<script>

  import { mapGetters } from 'vuex'
  import RoutesTable from './RoutesTable.vue'
  import AddRoute from './AddRoute.vue'
  import ClimbingwallEdit from './ClimbingwallEdit.vue'
  import SliderGallery from '../blocks/SliderGallery.vue'

  export default {
    name: 'ClimbingwallDescription',
    components: {RoutesTable, AddRoute, ClimbingwallEdit, SliderGallery},
    props: ['climbingwall', 'routes', 'VueGallery', 'kinds', 'pictures'],
    computed: {
      images () {
        return (this.pictures) ? Object.values(
          this.pictures.reduce((acc, pic, index) => ({...acc, [index]: pic.image}), {})) : []
      },
      ...mapGetters('auth', ['isLoggedIn']),
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .logo {
    max-height: 200px;
  }
</style>
