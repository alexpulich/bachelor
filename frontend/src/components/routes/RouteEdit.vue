<template>
  <div class="shadow bg-white p-4 border rounded" v-if="route">
    <h2>
      <small>
        <router-link :to="{ name: 'Route', params: { id: route.id }}">
          <i class="fa fa-arrow-left"></i>
        </router-link>
      </small>
      Редактирование трассы "{{ route.name }}"
    </h2>

    <form>
      <div class="form-group">
        <label for="name">Название: </label>
        <input id="name" name="name" type="text" class="form-control" v-model="form.name" :class="{'is-invalid': errors.name}">
        <template v-if="errors.name">
          <div v-for="error in errors.name" class="invalid-feedback">{{ error }}</div>
        </template>
      </div>
      <div class="form-group">
        <label for="kind">Дисципилна: </label>
        <select class="form-control" name="kind" id="kind" v-model="form.kind" :class="{'is-invalid': errors.kind}">
          <option v-for="kind in kinds" :value="kind.id" v-text="kind.name"></option>
        </select>
        <template v-if="errors.kind">
          <div v-for="error in errors.kind" class="invalid-feedback">{{ error }}</div>
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
        <label for="color">Цвет: </label>
        <input id="color" name="color" type="text" class="form-control" v-model="form.color" :class="{'is-invalid': errors.color}">
        <template v-if="errors.color">
          <div v-for="error in errors.color" class="invalid-feedback">{{ error }}</div>
        </template>
      </div>
      <div class="form-group">
        <label for="grade">Категория: </label>
        <select class="form-control" name="grade" id="grade" v-model="form.grade" :class="{'is-invalid': errors.grade}">
          <option value="5a">5a</option>
          <option value="5a+">5a+</option>
          <option value="5b">5b</option>
          <option value="5b+">5b+</option>
          <option value="5c">5c</option>
          <option value="5c+">5c+</option>
          <option value="6a">6a</option>
          <option value="6a+">6a+</option>
          <option value="6b">6b</option>
          <option value="6b+">6b+</option>
          <option value="6c">6c</option>
          <option value="6c+">6c+</option>
          <option value="7a">7a</option>
          <option value="7a+">7a+</option>
          <option value="7b">7b</option>
          <option value="7b+">7b+</option>
          <option value="7c">7c</option>
          <option value="7c+">7c+</option>
          <option value="8a">8a</option>
          <option value="8a+">8a+</option>
          <option value="8b">8b</option>
          <option value="8b+">8b+</option>
          <option value="8c">8c</option>
          <option value="8c+">8c+</option>
          <option value="9a">9a</option>
          <option value="9a+">9a+</option>
          <option value="9b">9b</option>
          <option value="9b+">9b+</option>
          <option value="9c">9c</option>
          <option value="9c+">9c+</option>
        </select>
        <template v-if="errors.grade">
          <div v-for="error in errors.grade" class="invalid-feedback">{{ error }}</div>
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
        <router-link class="btn btn-primary" :to="{ name: 'RouteEditPics', params: { id: route.id }}">Фотографии</router-link>
        <button class="btn btn-success" v-on:click.prevent="submitForm">Сохранить</button>
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
    name: 'RouteEdit',
    props: ['route', 'kinds'],
    data () {
      return {
        form: {
          id: this.route.id,
          name: this.route.name,
          description: this.route.description,
          color: this.route.color,
          grade: this.route.grade,
          kind: this.route.kind
        },
      }
    },
    computed: {
      isStatusOk () {
        return this.$store.getters['routes/status'] === 'ok'
      },
      isStatusError () {
        return this.$store.getters['routes/status'] === 'error'
      },
      errors () {
        return this.$store.getters['routes/errors']
      },
    },
    methods: {
      submitForm () {
        this.$store.dispatch('routes/setRoute', Object.assign({}, this.form))
      },
    },
    created() {
      this.$store.commit('routes/RESET_ERRORS')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
