<template>
  <div>
    <app-header
      brandTitle="Climbing for Me"
      heading="Найди свой скалодром"
      content="Эгегей, тут типо дипломная работа, и ниже ты можешь найти скалодромы"
    />
    <b-container fluid>
      <router-view/>
    </b-container>
    <app-footer>Climbingfor.Me &copy; 2018</app-footer>
  </div>
</template>

<script>
  import AppHeader from './components/layout/AppHeader'
  import AppFooter from './components/layout/AppFooter'

  export default {
    name: 'App',
    components: { AppHeader, AppFooter },
  }
</script>

<style>
  body {
    /*background: url('https://i.pinimg.com/originals/8d/cc/3a/8dcc3af74e7f3fd7cc11ef271f436ef2.jpg') repeat;*/
    /*background: #edeef0;*/
    background: #F1F3FA;
  }

  .shadow {
    box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.15);
  }
</style>
