<template>
  <div>
    <gallery v-if="images" :images="images" :index="index" @close="index = null"></gallery>
    <carousel :per-page="6">
      <slide v-for="image, imageIndex in images">
        <div class="thumbnail" @click="index = imageIndex">
          <img class="portrait" :src="image" alt="">
        </div>
      </slide>
    </carousel>
  </div>
</template>


<script>

  import {mapGetters} from 'vuex'

  export default {
    name: 'SliderGallery',
    props: ['images'],
    data() {
      return {
        index: null,
      }
    },
  }
</script>

<style scoped>
  .thumbnail {
    position: relative;
    width: 100%;
    height: 150px;
    overflow: hidden;
  }

  .thumbnail img {
    position: absolute;
    left: 50%;
    top: 50%;
    height: 100%;
    width: auto;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .thumbnail img.portrait {
    width: 100%;
    height: auto;
    padding: 10px;
  }
</style>
