<template>
  <div class="shadow bg-white p-4 border rounded" v-if="user">
    <div class="text-center">
      <h2 v-text="user.first_name + ' ' + user.last_name"></h2>
      <b-img fluid :src="user.photo" class="mb-3 logo"/>
    </div>
    <dl class="row">
      <!--TODO-->
    </dl>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'ProfileCard',
    props: ['user'],
    computed: {
      full_name() {
        return this.user.first_name + this.user.last_name
      }
    },
    created () {
//      this.$store.dispatch('climbingwalls/getKinds')
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .logo {
    max-height: 200px;
  }
</style>
