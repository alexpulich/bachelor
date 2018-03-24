<template>
  <div class="shadow bg-white p-4 border rounded" v-if="climbingwall">
    <h2>
      <small>
        <router-link :to="{ name: 'ClimbingwallEdit', params: { id: climbingwall.id }}">
          <i class="fa fa-arrow-left"></i>
        </router-link>
      </small>
      Редактирование фотографий скалодрома "{{ climbingwall.name }}"
    </h2>
    <div class="row mb-4">
      <gallery v-if="images" :images="images" :index="index" @close="index = null"></gallery>
      <div v-for="image, imageIndex in images" class="col-sm-2">
        <div class="thumbnail" @click="index=imageIndex">
          <img class="portrait" :src="image" alt="">
        </div>
        <div class="text-center">
          <button class="btn btn-danger btn-sm" @click="deleteImage(imageIndex)"><i class="fa fa-times"></i> Удалить</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h2>Добавление новых фотографий</h2>
        <form>
          <div class="form-group">
            <div class="mb-2" v-show="form.image">
              <img class="img-thumbnail img-responsive preview" alt="" :src="form.image">
            </div>
            <div class="custom-file">
              <input type="file" class="custom-file-input" :class="{'is-invalid': errors.image}" id="image" name="image"
                     @change="processFile($event)">
              <label class="custom-file-label" for="image">Выберите файл</label>
              <template v-if="errors.image">
                <div v-for="error in errors.image" class="invalid-feedback">{{ error }}</div>
              </template>
            </div>
          </div>
          <div class="form-group">
            <button class="btn btn-success" @click.prevent="uploadImage"><i class="fa fa-upload"></i> Загрузить</button>
          </div>
          <div class="alert alert-success" v-if="isStatusOk">
            Изменения успешно сохранены!
          </div>
          <div class="alert alert-danger" v-if="isStatusError">
            Не удалось сохранить изменения! Проверьте введенные данные и попробуйте еще раз.
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import SliderGallery from '../blocks/SliderGallery.vue'

  export default {
    name: 'ClimbingwallEditPics',
    components: {SliderGallery},
    props: ['climbingwall', 'pictures'],
    data () {
      return {
        index: null,
        form: {
          climbingwall: this.climbingwall.id,
          image: null,
        },
      }
    },
    computed: {
      isStatusOk () {
        return this.$store.getters['climbingwalls/status'] === 'ok'
      },
      isStatusError () {
        return this.$store.getters['climbingwalls/status'] === 'error'
      },
      errors () {
        return this.$store.getters['climbingwalls/errors']
      },
      images () {
        return (this.pictures) ? Object.values(this.pictures.reduce((acc, pic, index) => ({...acc, [index]: pic.image}), {})) :[];
      },
    },
    methods: {
      deleteImage (imageIndex) {
        this.$store.dispatch('climbingwalls/deleteImage', Object.assign({}, this.pictures[imageIndex]))
      },
      uploadImage () {
        this.$store.dispatch('climbingwalls/uploadImage', Object.assign({}, this.form))
      },
      processFile (event) {
        var input = event.target
        // Ensure that you have a file before attempting to read it
        if (input.files && input.files[0]) {
          // create a new FileReader to read this image and convert to base64 format
          var reader = new FileReader()
          // Define a callback function to run, when FileReader finishes its job
          reader.onload = (e) => {
            // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
            // Read image as base64 and set to imageData
            this.form.image = e.target.result
          }
          // Start the reader job - read file as a data url (base64 format)
          reader.readAsDataURL(input.files[0])
        }
//         this.form.logo = event.target.files[0];
//        console.log(event.target.files[0]);
      },
    },
    created () {
      this.$store.commit('climbingwalls/RESET_ERRORS')
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

  .preview {
    height: 150px;
  }
</style>
