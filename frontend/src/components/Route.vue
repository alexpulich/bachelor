<template>
  <div id="app">
    <b-container>
      <b-row>
        <b-col sm="5" class="bg-white p-4 border border-dark rounded">
          <div class="text-center" v-if="route.pictures">
            <b-img fluid :src="route.pictures[0]" class="mb-3 logo"/>
          </div>
          <dl class="row">
            <dt v-if="route.name" class="col-sm-4 text-right">Название:</dt>
            <dd v-if="route.name" class="col-sm-8" v-text="route.name"></dd>
            <dt v-if="route.color" class="col-sm-4 text-right">Цвет:</dt>
            <dd v-if="route.color" class="col-sm-8" v-text="route.color"></dd>
            <dt v-if="route.grade" class="col-sm-4 text-right">Категория:</dt>
            <dd v-if="route.grade" class="col-sm-8" v-text="route.grade"></dd>
            <dt v-if="route.author" class="col-sm-4 text-right">Автор:</dt>
            <dd v-if="route.author" class="col-sm-8" v-text="route.author"></dd>
            <dt class="col-sm-4 text-right">Рейтинг:</dt>
            <dd class="col-sm-8" v-text="route.rank"></dd>
          </dl>
        </b-col>
        <b-col sm="6" offset-sm="1" class="bg-white p-4 border border-dark rounded">
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  export default {
    name: 'Route',
    data () {
      return {
        route: {}
      }
    },
    created () {
      window.axios.get('http://localhost:8000/api/v1/routes/' + this.$route.params.id).then(response => (this.route = response.data))
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
