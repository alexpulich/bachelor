<template>
  <div>
    <h4>Трассы:</h4>
    <table v-if="routes" class="table table-striped">
      <thead>
      <tr>
        <th scope="col">Название</th>
        <th scope="col">Категория</th>
        <th scope="col">Рейтинг</th>
        <th scope="col">Автор</th>
        <!--<th v-if="isLoggedIn" scope="col"></th>-->
      </tr>
      </thead>
      <tbody>
      <tr v-for="route in routes">
        <td><router-link :to="{ name: 'Route', params: { id: route.id }}">{{route.name}}</router-link></td>
        <td>{{route.grade}}</td>
        <td>{{route.rank}}</td>
        <!-- TODO сделать красивее-->
        <td>{{users[route.author].first_name + ' ' + users[route.author].last_name}}</td>
        <!--<td v-if="isLoggedIn"><router-link :to="{ name: 'RouteEdit', params: { id: route.item.id }}"><i class="fa fa-edit"></i></router-link></td>-->
      </tr>
      </tbody>
    </table>
    <b-alert v-else show variant="info">
      К сожалению, еще никто не добавил трассы для скалодрома "{{ climbingwall.name}}".
    </b-alert>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'RoutesTable',
    props: ['routes', 'users', 'climbingwall'],
    computed: mapGetters(['isLoggedIn']),

  }
</script>

<style scoped></style>
