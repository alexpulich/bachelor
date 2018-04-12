<template>
  <div class="shadow bg-white p-4 border rounded" v-if="user">
    <h2>
      <small>
        <router-link :to="{ name: 'Profile' }"><i class="fa fa-arrow-left"></i>
        </router-link>
      </small>
      Добавление тренировки
    </h2>
    <form @submit.prevent="onSubmit" @reset="onReset">
      <div class="form-group">
        <label>Начало тренировки:</label>
        <datetime v-model="form.start_date" input-class="form-control" :class="{'is-invalid': errors.start_date}"
                  type="datetime" placeholder="Начало тренировки" required
                  :phrases="{ok: 'Далее', cancel: 'Отмена'}"></datetime>
      </div>
      <div class="form-group">
        <label>Конец тренировки:</label>
        <datetime v-model="form.end_date" input-class="form-control" :class="{'is-invalid': errors.end_date}"
                  type="datetime" placeholder="Конец тренировки" required
                  :phrases="{ok: 'Далее', cancel: 'Отмена'}"></datetime>
      </div>
      <div class="form-group">
        <label>Комментарии:</label>
        <textarea class="form-control" id="comments"
                  v-model="form.comments"
                  :class="{'is-invalid': errors.comments}"
                  rows="3"
                  required
                  placeholder="Описание тренировки, результатов и т.п.">
        </textarea>
      </div>
      <h4>Трассы</h4>
      <template v-if="form.training_routes.length">
        <div class="form-inline" v-for="(route, index) in form.training_routes">
          <div class="form-group mr-sm-3 mb-2">
            <label class="sr-only">Трасса</label>
            <select name="" id="" class="form-control" v-model="route.route">
              <option v-for="routeShort in routesShort" :value="routeShort.id">
                {{ routeShort.name }} ({{ routeShort.grade }})
              </option>
            </select>
          </div>
          <div class="form-group mr-sm-3 mb-2">
            <label class="sr-only">Количество попыток</label>
            <input type="number" class="form-control" placeholder="Попытки" v-model="route.attempts">
          </div>
          <div class="form-group mr-sm-3 mb-2">
            <label class="sr-only">Результат</label>
            <input type="text" class="form-control" placeholder="Реузультат" v-model="route.result">
          </div>
          <div class="form-group mr-sm-3 mb-2">
            <button class="btn btn-danger" @click.prevent="deleteRouteField(index)"><i class="fa fa-trash"></i></button>
          </div>
        </div>
      </template>
      <div class="alert alert-primary" v-else>
        С данной тренировкой нет связанных трасс. Вы можете добавить их по кнопке ниже.
      </div>
      <div class="form-group">
        <button class="btn btn-primary btn-sm" @click.prevent="addRouteFields"><i class="fa fa-plus"></i>
          Добавить трассу
        </button>
      </div>
      <div class="form-group">
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </div>
      <div class="alert alert-success" v-if="isStatusOk">
        Изменения успешно сохранены!
      </div>
      <div class="alert alert-danger" v-if="isStatusError">
        Не удалось сохранить изменения! Проверьте введенные данные и попробуйте еще раз.
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'TrainingEdit',
    props: ['user', 'routesShort'],
    data () {
      return {
        form: {
          user: this.$store.getters['auth/userId'],
          comments: '',
          start_date: '',
          end_date: '',
          training_routes: [],
        },
      }
    },
    computed: {
      isStatusOk () {
        return this.$store.getters['users/status']=== 'ok'
      },
      isStatusError () {
        return this.$store.getters['users/status'] === 'error'
      },
      errors () {
        return this.$store.getters['users/errors']
      },
    },
    methods: {
      deleteRouteField(index) {
        this.form.training_routes.splice(index, 1)
      },
      addRouteFields () {
        this.form.training_routes.push({
          route: 1,
          attempts: 0,
          result: '',
        })
      },
      onReset () {
      },
      onSubmit () {
        this.$store.dispatch('users/setTraining', Object.assign({}, this.form))
      },
    },

    created () {
    },
  }
</script>

<style scoped>
</style>
