<template>
  <b-row>
    <b-col sm="12">
        <h1>Рейтинг трасс</h1>
      <div class="shadow bg-white p-4 border rounded">
        <b-table v-if="routes.length" responsive striped hover :items="routes" :fields="routesTableFields">
          <template slot="name" slot-scope="route">
            <router-link :to="{ name: 'Route', params: { id: route.item.id }}">{{ route.value }}</router-link>
          </template>
          <template slot="climbing_wall" slot-scope="data" v-text="">
            {{ data.value.name}}
          </template>
          <template slot="author" slot-scope="data" v-text="">
            {{ data.value.first_name + ' ' + data.value.last_name}}
          </template>
        </b-table>
      </div>
    </b-col>
  </b-row>
</template>

<script>
  import {Routes} from '../api/routes'

  export default {
    name: 'Routes',
    data() {
      return {
        routes: {},
        routesTableFields: [
          {
            label: 'Рейтинг',
            key: 'rank'
          },
          {
            label: 'Название',
            key: 'name'
          },
          {
            label: 'Категория',
            key: 'grade'
          },
          {
            label: 'Скалодром',
            key: 'climbing_wall'
          },
          {
            lable: 'Автор',
            key: 'author'
          }
        ],
      }
    },
    created() {
      Routes.rating().then(response => (this.routes = response))
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
