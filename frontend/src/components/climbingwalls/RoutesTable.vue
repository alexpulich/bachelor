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
      </tr>
      </thead>
      <tbody>
      <tr v-for="route in routes">
        <td>{{route.name}}</td>
        <td>{{route.grade}}</td>
        <td>{{route.rank}}</td>
        <!-- TODO сделать красивее-->
        <td>{{users[route.author].first_name + ' ' + users[route.author].last_name}}</td>
      </tr>
      </tbody>
    </table>
    <b-alert v-else show variant="info">
      К сожалению, еще никто не добавил трассы для скалодрома "{{ climbingwall.name}}".
    </b-alert>
  </div>
</template>

<script>
  export default {
    name: 'RoutesTable',
    props: ['routes', 'users'],
    data() {
      return {
        climbing_wall
      }
    },
    computed: {
//      authors() {
//        return this.$store.getters.authors;
//      },
//      climbingwall() {
//        return this.$store.getters.climbingwall(this.$route.params.id)
//      },
    },
  }
</script>

<style scoped></style>
