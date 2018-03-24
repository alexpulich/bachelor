<template>
  <div class="shadow bg-white p-4 border rounded">
    <h2>
      <small>
        <router-link :to="{ name: 'Climbingwall', params: { id: route.climbingwall }}">
          <i class="fa fa-arrow-left"></i>
        </router-link>
        <router-link :to="{ name: 'RouteEdit', params: { id: route.id }}">
          <i class="fa fa-edit"></i>
        </router-link>
      </small>
      Описание
    </h2>
    <div>
      <p v-text="route.description"></p>
      <h2>
        <small>
          <router-link :to="{ name: 'RouteEditPics', params: { id: route.id }}">
            <i class="fa fa-edit"></i>
          </router-link>
        </small>
        Фотографии
      </h2>
      <slider-gallery v-if="images.length" :images="images"></slider-gallery>
      <div class="alert alert-primary" v-else>
        Фотографий пока нет :( Вы можете добавить их
        <router-link :to="{ name: 'RouteEditPics', params: { id: route.id }}">здесь</router-link>
      </div>
    </div>
  </div>
</template>

<script>

  import SliderGallery from '../blocks/SliderGallery.vue'
  import RouteEdit from './RouteEdit.vue'
  import { mapGetters } from 'vuex'

  export default {
    name: 'RouteDescription',
    components: {SliderGallery, RouteEdit},
    props: ['route', 'pictures'],
    data () {
      return {
        index: null,
      }
    },
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
</style>
