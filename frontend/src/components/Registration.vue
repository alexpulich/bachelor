<template>
  <div class="row">
    <div class="col-sm-6 mx-auto">
      <h1>Регистрация</h1>
      <div class="shadow bg-white p-4 border rounded">
        <div class="alert alert-success" v-if="isLoggedIn">
          Вы успешно зарегистрировались! <router-link :to="{ name: 'Index' }">Перейти на главную</router-link>
        </div>
        <form @submit.prevent="onSubmit" v-else>
          <div class="form-group">
            <label for="email">E-mail</label>
            <input v-model="form.email" :class="{'is-invalid': errors.email }" type="email" class="form-control"
                   id="email" placeholder="Введите ваш E-mail">
            <template v-if="errors.email">
              <div v-for="error in errors.email" class="invalid-feedback">{{ error }}</div>
            </template>
          </div>
          <div class="form-group">
            <label for="first_name">Имя</label>
            <input v-model="form.first_name" :class="{'is-invalid': errors.first_name }" type="text"
                   class="form-control" id="first_name" placeholder="Введите ваше имя">
            <template v-if="errors.first_name">
              <div v-for="error in errors.first_name" class="invalid-feedback">{{ error }}</div>
            </template>
          </div>
          <div class="form-group">
            <label for="last_name">Фамилия</label>
            <input v-model="form.last_name" :class="{'is-invalid': errors.last_name }" type="text" class="form-control"
                   id="last_name" placeholder="Введите вашу фамилию">
            <template v-if="errors.last_name">
              <div v-for="error in errors.last_name" class="invalid-feedback">{{ error }}</div>
            </template>
          </div>
          <div class="form-group">
            <label for="password1">Пароль</label>
            <input v-model="form.password1" :class="{'is-invalid': errors.password1 }" type="password"
                   class="form-control" id="password1" placeholder="Введите пароль">
            <template v-if="errors.password1">
              <div v-for="error in errors.password1" class="invalid-feedback">{{ error }}</div>
            </template>
          </div>
          <div class="form-group">
            <label for="password2">Подтвердите пароль</label>
            <input v-model="form.password2" :class="{'is-invalid': errors.password2 }" type="password"
                   class="form-control" id="password2" placeholder="Подтвердите пароль">
            <template v-if="errors.password2">
              <div v-for="error in errors.password2" class="invalid-feedback">{{ error }}</div>
            </template>
          </div>
          <button class="btn btn-primary">Зарегистрироваться</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import {HTTP} from '../api/common';
  import {mapGetters} from 'vuex'

  export default {
    name: 'Registration',
    data() {
      return {
        form: {
          email: '',
          first_name: '',
          last_name: '',
          password1: '',
          password2: ''
        },
      }
    },
    computed: mapGetters(['isLoggedIn', 'errors']),

    methods: {
      onSubmit() {
        this.$store.dispatch("registration", this.form)
      }
    },
    created() {
      if (this.isLoggedIn) {
        this.$router.push("/")
      }
      this.$store.dispatch('emptyErrors')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
