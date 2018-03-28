<template>
  <form class="form-signin" @submit.prevent="onSubmit">
    <h1 class="h3 mb-3 font-weight-normal">Авторизация</h1>
    <label for="inputEmail" class="sr-only">E-mail</label>
    <input type="email" id="inputEmail" class="form-control" :class="{'is-invalid': errors.email}"
           placeholder="E-mail" required="" autofocus="" v-model="form.email">
    <template v-if="errors.email">
      <div v-for="error in errors.email" class="invalid-feedback">{{ error }}</div>
    </template>
    <label for="inputPassword" class="sr-only">Пароль</label>
    <input type="password" id="inputPassword" class="form-control" :class="{'is-invalid': errors.password}"
           placeholder="Пароль" required="" v-model="form.password">
    <template v-if="errors.password">
      <div v-for="error in errors.password" class="invalid-feedback">{{ error }}</div>
    </template>
    <template>
      <div class="alert alert-danger" v-if="errors.non_field_errors">
        <ul class="list-unstyled">
          <li v-for="error in errors.non_field_errors">{{ error }}</li>
        </ul>
      </div>
    </template>
    <div class="form-group">
      <button class="btn btn-lg btn-primary btn-block" type="submit">Войти</button>
    </div>
    <div class="text-center">
      <router-link :to="{ name: 'Registration' }">Зарегистрироваться</router-link>
    </div>
  </form>
</template>

<script>
  import { HTTP } from '../api/common'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Login',
    data () {
      return {
        form: {
          email: '',
          password: '',
        },
      }
    },
    computed: {
      ...mapGetters('auth', ['isLoggedIn', 'errors']),
    },

    methods: {
      onSubmit () {
        this.$store.dispatch('auth/login', this.form)
        if (this.$route.query.from) {
          this.$router.push({path: this.from})
        }
      },
    },
    created () {
      if (this.isLoggedIn) {
        this.$router.push('/')
      }
      this.$store.dispatch('auth/emptyErrors')
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  html,
  body {
    height: 100%;
  }

  body {
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex-align: center;
    -ms-flex-pack: center;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
  }

  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
  }

  .form-signin .checkbox {
    font-weight: 400;
  }

  .form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }

  .form-signin .form-control:focus {
    z-index: 2;
  }

  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }


</style>
