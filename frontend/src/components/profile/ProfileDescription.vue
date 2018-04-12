<template>
  <div class="shadow bg-white p-4 border rounded" v-if="user">
    <h2>
      <small>
        <router-link :to="{ name: 'ProfileEdit' }"><i class="fa fa-edit"></i>
        </router-link>
      </small>
      Обо мне
    </h2>
    <p v-text="user.description"></p>
    <h2>
      <small>
        <router-link :to="{ name: 'ProfileTrainingAdd' }"><i class="fa fa-plus"></i></router-link>
      </small>
      Дневник тренировок
    </h2>
    <vue-event-calendar :events="userTrainingsCalendar">
      <template scope="props">
        <div v-for="(event) in props.showEvents" class="event-item">
          <!-- In here do whatever you want, make you owner event template -->
          <dl>
            <dt>Дата:</dt>
            <dd>{{ getDate(userTrainings[event.index].start_date) }}</dd>
            <dt>Продолжительность:</dt>
            <dd>{{ getDuration(userTrainings[event.index]) }}</dd>
            <dt>Комментарии:</dt>
            <dd>{{ userTrainings[event.index].comments }}</dd>
          </dl>
          <template v-if="userTrainings[event.index].training_routes.length">
            <dt>Трассы:</dt>
            <dd>
              <ul class="training-routes">
                <li v-for="route in userTrainings[event.index].training_routes">
                  <dl>
                    <dt>Название: </dt>
                    <dd>
                      {{ routesShort[route.route].name + ' (' + routesShort[route.route].grade + ')' }}
                    </dd>
                    <dt>Попытки: </dt>
                    <dd>{{ route.attempts }}</dd>
                    <dt>Результат: </dt>
                    <dd>{{ route.result }}</dd>
                  </dl>
                </li>
              </ul>
            </dd>
          </template>
        </div>
      </template>
    </vue-event-calendar>
    <h2>Мои трассы</h2>
    <routes-table :routes="routes" :kinds="kinds">
    </routes-table>
    <hr>
  </div>
  <!--</div>-->
</template>

<script>

  import { mapGetters } from 'vuex'
  import RoutesTable from '../climbingwalls/RoutesTable.vue'
  //  import AddRoute from './AddRoute.vue'
  //  import ClimbingwallEdit from './ClimbingwallEdit.vue'
  //  import SliderGallery from '../blocks/SliderGallery.vue'

  export default {
    name: 'ProfileDescription',
    components: {RoutesTable},
    props: ['user', 'routes', 'kinds', 'userTrainings', 'routesShort'],
    computed: {
      userTrainingsCalendar () {
        return this.$store.getters['users/userTrainingsCalendar'](this.$store.getters['auth/userId'])
      },
    },
    methods: {
      getDuration (day) {
        return this.getTimeFromDate(day.start_date) + ' - ' + this.getTimeFromDate(day.end_date)
      },
      getDate(date) {
        return new Date(date).toISOString().substr(0, 10);
      },
      getTimeFromDate (date) {
        let dateObj = new Date(date)
        return dateObj.getHours() + ':' + dateObj.getMinutes()
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .training-routes {
    list-style: none;
  }

  .training-routes dl {
    width: 100%;
    overflow: hidden;
  }
  .training-routes dt {
    float:left;
    width: 25%;
  }
  .training-routes dd {
    float:left;
    width: 75%;
  }
</style>
