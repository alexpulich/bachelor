<template>
  <div class="shadow bg-white p-4 border rounded" v-if="climbingwall">
    <div class="text-center">
      <h2 v-text="climbingwall.name"></h2>
      <b-img fluid :src="climbingwall.logo" class="mb-3 logo"/>
    </div>
    <dl class="row">
      <dt v-if="climbingwall.kinds.length" class="col-sm-4 text-right">Дисциплины:</dt>
      <dd v-if="climbingwall.kinds.length" class="col-sm-8">
        <span v-for="kind in climbingwall.kinds" class="badge badge-pill badge-primary mr-1"
              v-text="kinds[kind].name"></span>
      </dd>
      <dt v-if="climbingwall.website" class="col-sm-4 text-right">Сайт:</dt>
      <dd v-if="climbingwall.website" class="col-sm-8">
        <a :href="climbingwall.website" v-text="climbingwall.website"></a>
      </dd>
      <dt v-if="climbingwall.contacts" class="col-sm-4 text-right">Контакты:</dt>
      <dd v-if="climbingwall.contacts" class="col-sm-8" v-text="climbingwall.contacts"></dd>
      <dt v-if="climbingwall.address" class="col-sm-4 text-right">Адрес:</dt>
      <dd v-if="climbingwall.address" class="col-sm-8" v-text="climbingwall.address"></dd>
      <dt v-if="climbingwall.open_time" class="col-sm-4 text-right">Режим работы:</dt>
      <dd v-if="climbingwall.open_time" class="col-sm-8" v-text="climbingwall.open_time"></dd>
    </dl>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'ClimbingwallCard',
    props: ['climbingwall'],
    computed: {
      ...mapGetters('climbingwalls', ['kinds'])
    },
    created () {
      this.$store.dispatch('climbingwalls/getKinds')
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .logo {
    max-height: 200px;
  }
</style>
