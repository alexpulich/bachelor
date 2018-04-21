<template>
  <div class="shadow bg-white p-4 border rounded" v-if="climbingwall">
    <h2>
      <small>
        <router-link :to="{ name: 'ClimbingwallEdit', params: { id: climbingwall.id }}"><i class="fa fa-edit"></i>
        </router-link>
      </small>
      О скалодроме
    </h2>
    <p v-text="climbingwall.description"></p>
    <h2>
      <small>
        <router-link :to="{ name: 'ClimbingwallEditPics', params: { id: climbingwall.id }}">
          <i class="fa fa-edit"></i>
        </router-link>
      </small>
      Фотографии
    </h2>
    <slider-gallery v-if="images.length" :images="images"></slider-gallery>
    <div class="alert alert-primary" v-else>
      Фотографий пока нет :( Вы можете добавить их
      <router-link :to="{ name: 'ClimbingwallEditPics', params: { id: climbingwall.id }}">здесь</router-link>
    </div>
    <template v-if="competitions">
      <h2>Соревнования</h2>
      <vue-event-calendar :events="competitionsCalendar">
        <template scope="props">
          <div v-for="(event) in props.showEvents" class="event-item">
            <div class="wrapper">
              <h3 class="title">{{event.title}}</h3>
              <p class="time">{{ getDate(event.date) }}</p>
              <p class="desc">{{event.desc}}</p>
              <p class="text-right">
                <button v-if="canParticipate(event.id)" class="btn btn-primary btn-sm" @click.prevent="participate(event.id)"><i class="fa fa-shake"></i> Участвовать</button>
                <button v-else class="btn btn-danger btn-sm" @click.prevent="dismiss(event.id)"><i class="fa fa-ban"></i> Отказаться</button>
                <router-link :to="{ name: 'Competition', params: { id: event.id }}" class="btn btn-primary btn-sm"><i class="fa fa-list-ol"></i> Результаты</router-link>
              </p>
            </div>
          </div>
        </template>
      </vue-event-calendar>
    </template>
    <routes-table :routes="routes" :climbingwall="climbingwall" :kinds="kinds">
    </routes-table>
    <hr>
    <add-route v-if="isLoggedIn" :kinds="kinds"></add-route>
  </div>
  <!--</div>-->
</template>

<script>

  import { mapGetters } from 'vuex'
  import RoutesTable from './RoutesTable.vue'
  import AddRoute from './AddRoute.vue'
  import ClimbingwallEdit from './ClimbingwallEdit.vue'
  import SliderGallery from '../blocks/SliderGallery.vue'
  import dateTimeFormatter from 'vue-event-calendar'

  export default {
    name: 'ClimbingwallDescription',
    components: {RoutesTable, AddRoute, ClimbingwallEdit, SliderGallery},
    props: ['climbingwall', 'routes', 'VueGallery', 'kinds', 'pictures', 'competitions'],
    computed: {
      competitionsCalendar () {
        return this.$store.getters['climbingwalls/competition_calendar'](this.$route.params.id)
      },
      images () {
        return (this.pictures) ? Object.values(
          this.pictures.reduce((acc, pic, index) => ({...acc, [index]: pic.image}), {})) : []
      },
      ...mapGetters('auth', ['isLoggedIn']),
    },
    methods: {
      getDate(date) {
        return new Date(date).toISOString().substr(0, 10);
      },
      participate(competition_id) {
        this.$store.dispatch('users/participate', competition_id)

      },
      dismiss(competition_id) {
        this.$store.dispatch('users/dismiss', competition_id)
      },
      canParticipate(competition_id) {
        let res = this.$store.getters['users/canParticipate'](this.$store.getters['auth/userId'], competition_id)
        return res;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .logo {
    max-height: 200px;
  }
</style>
