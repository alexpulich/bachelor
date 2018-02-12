<template>
  <b-container>
    <b-row>
      <b-col sm="4">
        <div class="shadow bg-white p-4 border rounded">
          <div class="text-center">
            <h5 v-text="climbingwall.name"></h5>
            <b-img fluid :src="climbingwall.logo" class="mb-3 logo"/>
          </div>
          <dl class="row">
            <dt v-if="climbingwall.website" class="col-sm-4 text-right">Сайт:</dt>
            <dd v-if="climbingwall.website" class="col-sm-8" v-text="climbingwall.website"></dd>
            <dt v-if="climbingwall.contacts" class="col-sm-4 text-right">Контакты:</dt>
            <dd v-if="climbingwall.contacts" class="col-sm-8" v-text="climbingwall.contacts"></dd>
            <dt v-if="climbingwall.address" class="col-sm-4 text-right">Адрес:</dt>
            <dd v-if="climbingwall.address" class="col-sm-8" v-text="climbingwall.address"></dd>
            <dt v-if="climbingwall.open_time" class="col-sm-4 text-right">Режим работы:</dt>
            <dd v-if="climbingwall.open_time" class="col-sm-8" v-text="climbingwall.open_time"></dd>
          </dl>
        </div>
      </b-col>
      <b-col sm="8">
        <div class="shadow bg-white p-4 border rounded">
        <h2>О скалодроме</h2>
        <p v-text="climbingwall.description"></p>
        <h4>Трассы:</h4>
        <b-table v-if="routes.length" responsive striped hover :items="routes" :fields="routesTableFields">
          <template slot="name" slot-scope="route">
            <router-link :to="{ name: 'Route', params: { id: route.item.id }}">{{ route.value }}</router-link>
          </template>
          <template slot="author" slot-scope="route">
            {{ route.item.author.first_name + ' ' + route.item.author.last_name }}
          </template>
        </b-table>
        <b-alert v-else show variant="info">
          К сожалению, еще никто не добавил трассы для скалодрома "{{ climbingwall.name}}".
        </b-alert>
        <b-form @submit.prevent="onSubmit" @reset="onReset" v-show="showForm">
          <b-form-group id="namegrp"
                        label="Название:"
                        label-for="name">
            <b-form-input id="name"
                          type="text"
                          v-model="form.name"
                          required
                          placeholder="Название трассы">
            </b-form-input>
          </b-form-group>
          <b-form-group id="gradegrp"
                        label="Категория:"
                        label-for="grade">
            <b-form-input id="grade"
                          type="text"
                          v-model="form.grade"
                          required
                          placeholder="Категория сложности">
            </b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
        <p></p>
        <b-button variant="success" @click="showForm=true"><i class="fa fa-plus"></i> Добавить трассу</b-button>
          </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    name: 'Climbingwall',
    data() {
      return {
        climbingwall: {},
        routes: [],
        routesTableFields: [
          {
            label: 'Название',
            key: 'name'
          },
          {
            label: 'Категория',
            key: 'grade'
          },
          {
            label: 'Рейтинг',
            key: 'rank'
          },
          {
            lable: 'Автор',
            key: 'author'
          }
        ],
        form: {
          id: 0,
          name: '',
          grade: ''
        },
        showForm: false
      }
    },
    methods: {
      onReset() {
        this.name = ''
        this.grade = ''
      },
      onSubmit() {
        var tmp_data = {
          name: this.form.name,
          color: 'кекнутые',
          rank: 0,
          climbing_wall: 'http://localhost:8000/api/v1/climbingwalls/' + this.$route.params.id + '/',
          grade: this.form.grade,
        }
        window.axios.post('http://localhost:8000/api/v1/routes/',
          tmp_data, {
            headers: {
              Authorization: 'Token 6cf7fabd259f0ac789b5fa57d2e44f8cdcbedc76'
            }
          }).then(response => (console.log(response)))
        this.routes.push(tmp_data)
        this.name = ''
        this.grade = ''
      }
    },

    created() {
      window.axios.get('http://localhost:8000/api/v1/climbingwalls/' + this.$route.params.id).then(response => (this.climbingwall = response.data))
      window.axios.get('http://localhost:8000/api/v1/climbingwalls/' + this.$route.params.id + '/routes/').then(response => (this.routes = response.data))
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .logo {
    max-height: 200px;
  }
</style>
