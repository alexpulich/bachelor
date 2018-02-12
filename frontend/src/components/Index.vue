<template>
  <div id="app">
    <b-container fluid>
      <b-row>
        <div class="px-3">
          <h1>Скалодромы</h1>
          <b-card-group deck>
            <!--<b-col sm="3" v-for="climbingwall in climbingwalls" :key="climbingwall.id">-->
            <b-card v-for="climbingwall in climbingwalls" :key="climbingwall.id"
                    :title="climbingwall.name"
                    :img-src="climbingwall.logo"
                    :img-alt="climbingwall.name"
                    img-fluid
                    img-top
                    tag="article"
                    style="max-width: 20rem; min-width: 15rem;"
                    class="mb-2 shadow">
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
    </b-container>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Index',
//    data() {
//      return {
//        climbingwalls: []
//      }
//    },

//    created() {
//      window.axios.get('http://localhost:8000/api/v1/climbingwalls/').then(response => (this.climbingwalls = response.data))
//    }
    beforeMount () {
    // Перед тем как загрузить страницу, нам нужно получить список всех
    // имеющихся заметок. Для этого мы вызываем действие `getNotes` из
    // нашего хранилища
      this.$store.dispatch('getClimbingwalls')
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
