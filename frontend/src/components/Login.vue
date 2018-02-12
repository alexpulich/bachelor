<template>
  <form class="form-signin" @submit.prevent="onSubmit">
    <h1 class="h3 mb-3 font-weight-normal">Авторизация</h1>
    <label for="inputEmail" class="sr-only">E-mail</label>
    <input type="email" id="inputEmail" class="form-control" :class="{'is-invalid': form.errors.email }" placeholder="E-mail" required="" autofocus="" v-model="form.data.email">
    <template v-if="form.errors.email" >
      <div v-for="error in form.errors.email" class="invalid-feedback">{{ error }}</div>
    </template>
    <label for="inputPassword" class="sr-only">Пароль</label>
    <input type="password" id="inputPassword" class="form-control" :class="{'is-invalid': form.errors.password }" placeholder="Пароль" required="" v-model="form.data.password">
    <template v-if="form.errors.password" >
      <div v-for="error in form.errors.password" class="invalid-feedback">{{ error }}</div>
    </template>
    <template>
      <div class="alert alert-danger" v-if="form.errors.non_field_errors.length">
        <ul class="list-unstyled">
          <li v-for="error in form.errors.non_field_errors">{{ error }}</li>
        </ul>
      </div>
    </template>
    <button class="btn btn-lg btn-primary btn-block" type="submit">Войти</button>
  </form>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        form: {
          data: {
            email: '',
            password: ''
          },
          errors: {
            email: '',
            password: '',
            non_field_errors: ''
          }
        },
      }
    },

    methods: {
      onSubmit() {
        window.axios.post('http://localhost:8000/api/v1/rest-auth/login/', this.form.data)
          .then(response => (console.log(response.data)))
          .catch(error => (
            this.form.errors = error.response.data
          ))
      }
    },

    created() {
//      window.axios.get('http://localhost:8000/api/v1/climbingwalls/').then(response => (this.climbingwalls = response.data))
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
