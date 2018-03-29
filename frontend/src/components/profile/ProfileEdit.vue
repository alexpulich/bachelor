<template>
  <div class="shadow bg-white p-4 border rounded" v-if="user">
    <h2>
      <small>
        <router-link :to="{ name: 'Profile'}"><i class="fa fa-arrow-left"></i>
        </router-link>
      </small>
      Редактирование профиля
    </h2>
    <form enctype="multipart/form-data">
      <div class="form-group">
        <label for="first_name">Имя: </label>
        <input id="first_name" name="first_name" type="text" class="form-control" :class="{'is-invalid': errors.first_name}"
               v-model="form.first_name">
        <template v-if="errors.first_name">
          <div v-for="error in errors.first_name" class="invalid-feedback">{{ error }}</div>
        </template>
      </div>
      <div class="form-group">
        <label for="last_name">Имя: </label>
        <input id="last_name" name="last_name" type="text" class="form-control" :class="{'is-invalid': errors.last_name}"
               v-model="form.last_name">
        <template v-if="errors.last_name">
          <div v-for="error in errors.last_name" class="invalid-feedback">{{ error }}</div>
        </template>
      </div>
      <div class="form-group">
        <label for="description">Описание: </label>
        <textarea class="form-control" name="description" id="description" rows="3"
                  v-model="form.description" :class="{'is-invalid': errors.description}"></textarea>
        <template v-if="errors.description">
          <div v-for="error in errors.description" class="invalid-feedback">{{ error }}</div>
        </template>
      </div>
      <div class="form-group">
        <label for="logo">Фото: </label>
        <div class="mb-2">
        <img class="img-thumbnail img-responsive preview" alt="" :src="form.photo">
          </div>
        <div class="custom-file">
          <input type="file" class="custom-file-input" :class="{'is-invalid': errors.photo}" id="logo" name="logo"
                 @change="processFile($event)">
          <label class="custom-file-label" for="logo">Выберите файл</label>
          <template v-if="errors.photo">
            <div v-for="error in errors.photo" class="invalid-feedback">{{ error }}</div>
          </template>
        </div>
      </div>
      <template v-if="errors.non_field_errors">
        <div class="alert alert-danger">
          <ul class="list-unstyled">
            <li v-for="error in errors.non_field_errors">{{ error }}</li>
          </ul>
        </div>
      </template>
      <div class="form-group">
        <button class="btn btn-success" @click.prevent="submitForm">Сохранить</button>
      </div>
      <div class="alert alert-success" v-if="isStatusOk">
        Изменения успешно сохранены!
      </div>
      <div class="alert alert-danger" v-if="isStatusError">
        Не удалось сохранить изменения! Проверьте введенные данные и попробуйте еще раз.
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'Profile',
    props: ['user'],
    data () {
      return {
        form: {
          id: this.user.id,
          user: this.user.user,
          first_name: this.user.first_name,
          last_name: this.user.last_name,
          description: this.user.description,
          photo: this.user.photo, //todo
        },
      }
    },
    computed: {
      isStatusOk () {
        return this.$store.getters['users/status']=== 'ok'
      },
      isStatusError () {
        return this.$store.getters['users/status'] === 'error'
      },
      errors () {
        return this.$store.getters['users/errors']
      },
    },
    methods: {
      submitForm () {
        this.$store.dispatch('users/setUser', Object.assign({}, this.form))
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
            this.form.photo = e.target.result
          }
          // Start the reader job - read file as a data url (base64 format)
          reader.readAsDataURL(input.files[0])
        }
      },
    },
    created () {
      this.$store.commit('users/RESET_ERRORS')
      /*
      this.$store.dispatch('climbingwalls/getKinds')
      */
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .preview {
    height: 150px;
  }
</style>
