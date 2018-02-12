<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand :to="{ name: 'Index' }">Climbing for me</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item :to="{ name: 'Index' }">Скалодромы</b-nav-item>
          <b-nav-item :to="{ name: 'Login' }">Войти</b-nav-item>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
    <b-jumbotron fluid header="Найди свой скалодром!"
                 lead="Эгегей, тут типо дипломная работа, и ниже ты можешь найти скалодромы">
    </b-jumbotron>
    <router-view/>
    <footer class="footer">
      <div class="container">
        <p class="text-center text-muted">Climbingfor.Me &copy; 2018</p>
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'App',
  }
</script>

<style>
  body {
    /*background: url('https://i.pinimg.com/originals/8d/cc/3a/8dcc3af74e7f3fd7cc11ef271f436ef2.jpg') repeat;*/
    /*background: #edeef0;*/
    background: #F1F3FA;
  }

  .jumbotron {
    color: white;
    background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)), url('https://www.walltopia.com/images/projects/The_Cliffs/TheCliffs_.jpg') no-repeat center -310px;
    background-size: cover;
    box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.85);
  }

  .shadow {
    box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.15);
  }

  .footer {
    height: 60px;
    line-height: 60px;
  }
</style>
