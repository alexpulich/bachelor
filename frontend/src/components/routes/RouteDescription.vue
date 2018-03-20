<template>
  <div class="shadow bg-white p-4 border rounded">
    <h2>
      <small><a href="#" v-on:click.prevent="toggleIsEditding"><i class="fa"
                                                                  :class="{'fa-edit':!isEditing, 'fa-arrow-left': isEditing}"></i></a>
      </small>
      {{ title }}
    </h2>
    <route-edit v-if="isEditing" :route="route"></route-edit>
    <div v-else>
      <p v-text="route.description"></p>
      <slider-gallery :images="images"></slider-gallery>
    </div>
  </div>
</template>

<script>

  import SliderGallery from '../blocks/SliderGallery.vue'
  import RouteEdit from './RouteEdit.vue'
  import {mapGetters} from 'vuex'

  export default {
    name: 'RouteDescription',
    components: {SliderGallery, RouteEdit},
    props: ['route'],
    data() {
      return {
        index: null,
        isEditing: false,
      }
    },
    computed: {
      images() {
        return Object.values(this.route.pictures.reduce((acc, pic, index) => ({...acc, [index]: pic.image}), {}))
      },
      title() {
        return this.isEditing ? 'Редактирование трассы "' + this.route.name + '"' : 'Описание';
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
</style>
