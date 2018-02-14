<template>
  <form class="form-signin" @submit.prevent="onSubmit">
    <h1 class="h3 mb-3 font-weight-normal">Авторизация</h1>
    <label for="inputEmail" class="sr-only">E-mail</label>
    <input type="email" id="inputEmail" class="form-control" :class="{'is-invalid': authErrors.email}"
           placeholder="E-mail" required="" autofocus="" v-model="form.email">
    <template v-if="authErrors.email">
      <div v-for="error in authErrors.email" class="invalid-feedback">{{ error }}</div>
    </template>
    <label for="inputPassword" class="sr-only">Пароль</label>
    <input type="password" id="inputPassword" class="form-control" :class="{'is-invalid': authErrors.password}"
           placeholder="Пароль" required="" v-model="form.password">
    <template v-if="authErrors.password">
      <div v-for="error in authErrors.password" class="invalid-feedback">{{ error }}</div>
    </template>
    <template>
      <div class="alert alert-danger" v-if="authErrors.non_field_errors">
        <ul class="list-unstyled">
          <li v-for="error in authErrors.non_field_errors">{{ error }}</li>
        </ul>
      </div>
    </template>
    <button class="btn btn-lg btn-primary btn-block" type="submit">Войти</button>
  </form>
</template>

<script>
  import {HTTP} from '../api/common';
  import {mapGetters} from 'vuex'

  export default {
    name: 'Login',
    data() {
      return {
        form: {
          email: '',
          password: ''
        },
        authErrors: {},
      }
    },
    computed: mapGetters(['isLoggedIn']),

    methods: {
      onSubmit() {
        this.$store.dispatch("login", this.form).then(() => {
           this.$router.push('/')
        }).catch((error) => {
          this.authErrors = error;
        })
      }
    },
    created() {
      if (this.isLoggedIn) {
        this.$router.push("/")
      }
    }
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
