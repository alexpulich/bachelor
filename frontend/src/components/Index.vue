<template>
  <b-row>
    <div class="px-3">
      <h1>Скалодромы</h1>
      <b-card-group deck>
        <!--<b-col sm="3" v-for="climbingwall in climbingwalls" :key="climbingwall.id">-->
        <b-card v-for="climbingwall in climbingwalls_short" :key="climbingwall.id"
                :title="climbingwall.name"
                :img-src="climbingwall.logo"
                :img-alt="climbingwall.name"
                img-fluid
                img-top
                tag="article"
                style="max-width: 20rem; min-width: 15rem;"
                class="mb-2 shadow">
          <span v-for="kind in climbingwall.kinds" class="badge badge-pill badge-primary mr-1" v-text="kind.name"></span>
          <p class="card-text">
            {{ climbingwall.description }}
          </p>
          <b-button :to="{ name: 'Climbingwall', params: { id: climbingwall.id }}" variant="primary">Подробнее
          </b-button>
        </b-card>
        <!--</b-col>-->
      </b-card-group>
    </div>
  </b-row>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'Index',

    computed: mapGetters('climbingwalls', ['climbingwalls_short']),

    created() {
      this.$store.dispatch('climbingwalls/getClimbingwallsShort')
    }

  }
</script>

<style scoped>
</style>
