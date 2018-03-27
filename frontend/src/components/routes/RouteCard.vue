<template>
  <div class="shadow bg-white p-4 border rounded">
    <div class="text-center">
      <h2>Карточка трассы</h2>
    </div>
    <dl class="row">
      <dt v-if="climbingwall[route.climbingwall].name" class="col-sm-4 text-right">Скалодром:</dt>
      <dd v-if="climbingwall[route.climbingwall].name" class="col-sm-8" v-text="climbingwall[route.climbingwall].name"></dd>
      <dt v-if="route.name" class="col-sm-4 text-right">Название:</dt>
      <dd v-if="route.name" class="col-sm-8" v-text="route.name"></dd>
      <dt v-if="route.kind" class="col-sm-4 text-right">Дисциплина:</dt>
      <dd v-if="route.kind" class="col-sm-8">
        <span class="badge badge-pill badge-primary" v-text="kinds[route.kind].name"></span>
      </dd>
      <dt v-if="route.color" class="col-sm-4 text-right">Цвет:</dt>
      <dd v-if="route.color" class="col-sm-8" v-text="route.color"></dd>
      <dt v-if="route.grade" class="col-sm-4 text-right">Категория:</dt>
      <dd v-if="route.grade" class="col-sm-8" v-text="route.grade"></dd>
      <dt v-if="route.author" class="col-sm-4 text-right">Автор:</dt>
      <dd v-if="route.author" class="col-sm-8" v-text="authorName"></dd>
      <dt class="col-sm-4 text-right">Рейтинг:</dt>
      <dd class="col-sm-8" v-text="route.rank"></dd>
    </dl>
  </div>
</template>

<script>
  export default {
    name: 'RouteCard',
    props: ['route', 'kinds'],

    computed: {
      authorName () {
        return this.route.author.first_name + ' ' + this.route.author.last_name
      },
      climbingwall() {
        return this.$store.getters['climbingwalls/climbingwalls_short']
      }
    },

    created() {
      this.$store.dispatch('climbingwalls/getClimbingwallsShort')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
