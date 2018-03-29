<template>
  <header>
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand v-if="brandTitle" :to="{ name: 'Index' }">{{ brandTitle }}</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'Index' }">Скалодромы</b-nav-item>
          <!--<b-nav-item :to="{ name: 'Routes' }">Трассы</b-nav-item>-->
          <b-nav-item v-if="isLoggedIn" :to="{ name: 'Profile' }">Профиль</b-nav-item>
          <b-nav-item :to="{ name: 'Login' }" v-if="!isLoggedIn">Войти</b-nav-item>
          <b-nav-item @click="logout" v-else>Выйти</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-jumbotron fluid :header="heading"
                 :lead="content">
    </b-jumbotron>
  </header>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'AppHeader',
    props: ['brandTitle', 'heading', 'content'],
    computed: mapGetters('auth', ['isLoggedIn']),
    methods: {
      logout() {
        this.$store.dispatch("auth/logout").then(() => {
        });
      }
    }
  }
</script>

<style scoped>
  .jumbotron {
    color: white;
    background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)), url('https://www.walltopia.com/images/projects/The_Cliffs/TheCliffs_.jpg') no-repeat center -310px;
    background-size: cover;
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.85);
  }

  .group {
  border-radius: 9999px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .3);
  height: 150px;
  margin: 0 20px;
  overflow: hidden;
  width: 150px;
}

.group > div {
  background-color: #333;
  background-position: 50% 50%;
  background-size: cover;
  float: left;
  height: 100%;
  width: 50%;
}
</style>
