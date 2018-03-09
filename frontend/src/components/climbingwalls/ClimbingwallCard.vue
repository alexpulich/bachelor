<template>
  <div class="shadow bg-white p-4 border rounded">
    <div class="text-center">
      <h5 v-text="climbingwall.name"></h5>
      <b-img fluid :src="climbingwall.logo" class="mb-3 logo"/>
    </div>
    <dl class="row">
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
  export default {
    name: 'ClimbingwallCard',
    props: ['climbingwall'],
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .logo {
    max-height: 200px;
  }
</style>
