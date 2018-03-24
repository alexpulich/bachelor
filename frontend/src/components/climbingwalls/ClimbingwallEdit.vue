<template>
  <div class="shadow bg-white p-4 border rounded" v-if="climbingwall">
    <h2>
      <small>
        <router-link :to="{ name: 'Climbingwall', params: { id: climbingwall.id }}"><i class="fa fa-arrow-left"></i>
        </router-link>
      </small>
      Редактирование скалодрома "{{ climbingwall.name }}"
    </h2>
    <form enctype="multipart/form-data">
      <div class="form-group">
        <label for="name">Название: </label>
        <input id="name" name="name" type="text" class="form-control" :class="{'is-invalid': errors.name}"
               v-model="form.name">
        <template v-if="errors.name">
          <div v-for="error in errors.name" class="invalid-feedback">{{ error }}</div>
        </template>
      </div>
      <div class="form-group">
        <label for="logo">Логотип: </label>
        <div class="mb-2">
        <img class="img-thumbnail img-responsive preview" alt="" :src="form.logo">
          </div>
        <div class="custom-file">
          <input type="file" class="custom-file-input" :class="{'is-invalid': errors.logo}" id="logo" name="logo"
                 @change="processFile($event)">
          <label class="custom-file-label" for="logo">Выберите файл</label>
          <template v-if="errors.logo">
            <div v-for="error in errors.logo" class="invalid-feedback">{{ error }}</div>
          </template>
        </div>
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
        <label for="kinds">Дисципилны: </label>
        <select class="form-control" name="kinds" id="kinds" multiple v-model="form.kinds"
                :class="{'is-invalid': errors.kinds}">
          <option v-for="kind in kinds" :value="kind.id" v-text="kind.name"></option>
        </select>
        <template v-if="errors.kinds">
          <div v-for="error in errors.kinds" class="invalid-feedback">{{ error }}</div>
        </template>
      </div>
      <div class="form-group">
        <label for="name">Адрес: </label>
        <input id="address" name="address" type="text" class="form-control" v-model="form.address"
               :class="{'is-invalid': errors.address}">
        <template v-if="errors.address">
          <div v-for="error in errors.address" class="invalid-feedback">{{ error }}</div>
        </template>
      </div>
      <div class="form-group">
        <label for="website">Веб-сайт: </label>
        <input id="website" name="website" type="text" class="form-control" v-model="form.website"
               :class="{'is-invalid': errors.website}">
        <template v-if="errors.website">
          <div v-for="error in errors.website" class="invalid-feedback">{{ error }}</div>
        </template>
      </div>
      <div class="form-group">
        <label for="contacts">Контакты: </label>
        <input id="contacts" name="contacts" type="text" class="form-control" v-model="form.contacts"
               :class="{'is-invalid': errors.contacts}">
        <template v-if="errors.contacts">
          <div v-for="error in errors.contacts" class="invalid-feedback">{{ error }}</div>
        </template>
      </div>
      <div class="form-group">
        <label for="open_time">Режим работы: </label>
        <input id="open_time" name="open_time" type="text" class="form-control" v-model="form.open_time"
               :class="{'is-invalid': errors.open_time}">
        <template v-if="errors.open_time">
          <div v-for="error in errors.open_time" class="invalid-feedback">{{ error }}</div>
        </template>
      </div>
      <template v-if="errors.non_field_errors">
        <div class="alert alert-danger">
          <ul class="list-unstyled">
            <li v-for="error in errors.non_field_errors">{{ error }}</li>
          </ul>
        </div>
      </template>
      <div class="form-group">
        <router-link class="btn btn-primary" :to="{ name: 'ClimbingwallEditPics', params: { id: climbingwall.id }}">Фотографии</router-link>
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
  import climbingwalls from '../../store/modules/climbingwalls'

  export default {
    name: 'ClimbingwallEdit',
    props: ['climbingwall', 'kinds'],
    data () {
      return {
        form: {
          logo: this.climbingwall.logo, //todo
          id: this.climbingwall.id,
          name: this.climbingwall.name,
          routes: this.climbingwall.routes,
          description: this.climbingwall.description,
          address: this.climbingwall.address,
          website: this.climbingwall.website,
          kinds: this.climbingwall.kinds,
          contacts: this.climbingwall.contacts,
//          networks: null //todo,
          open_time: this.climbingwall.open_time,
        },
      }
    },
    computed: {
      isStatusOk () {
        return this.$store.getters['climbingwalls/status']=== 'ok'
      },
      isStatusError () {
        return this.$store.getters['climbingwalls/status'] === 'error'
      },
      errors () {
        return this.$store.getters['climbingwalls/errors']
      },
      options () {
        let tmp = []
        this.form.kinds.forEach(function (item, i, arr) {
          tmp.push({
            text: item.name,
            value: item.id,
          })
        })
        return tmp
      },
    },
    methods: {
      submitForm () {
        this.$store.dispatch('climbingwalls/setClimbingwall', Object.assign({}, this.form))
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
            this.form.logo = e.target.result
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
      this.$store.dispatch('climbingwalls/getKinds')
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .preview {
    height: 150px;
  }
</style>
