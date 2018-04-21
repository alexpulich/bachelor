<template>
  <div class="shadow bg-white p-4 border rounded">
    <h2>
      <small>
        <router-link :to="{ name: 'Competition', params: { id: competition.id }}">
          <i class="fa fa-arrow-left"></i>
        </router-link>
      </small>
      Добавление результатов соревнования "{{ competition.name }}"
    </h2>
    <form>
      <div class="form-group">
        <label>Трасса:</label>
        <select class="form-control" :class="{'is-invalid': errors.route}" v-model="form.route" required>
          <option value="" disabled>Выберите трассу</option>
          <option v-for="route in routes" :value="route.id">{{ route.name }} ({{ route.grade }})</option>
        </select>
        <template v-if="errors.route">
          <div v-for="error in errors.route" class="invalid-feedback">{{ error }}</div>
        </template>
      </div>
      <div class="form-group">
        <label>Результат:</label>
        <select class="form-control" :class="{'is-invalid': errors.result}" v-model="form.result" required>
          <option value="" disabled>Выберите ваш результат</option>
          <option value="F">FLASH</option>
          <option value="SG">SECOND GO</option>
          <option value="RP">RED POINT</option>
        </select>
        <template v-if="errors.result">
          <div v-for="error in errors.result" class="invalid-feedback">{{ error }}</div>
        </template>
      </div>
      <template v-if="errors.non_field_errors">
        <div class="alert alert-danger">
          <ul class="list-unstyled">
            <li v-for="error in errors.non_field_errors">{{ error }}</li>
          </ul>
        </div>
      </template>
      <div class="alert alert-success" v-if="isStatusOk">
        Ваш результат успешно добавлен!
      </div>
      <div class="alert alert-danger" v-if="isStatusError">
        Не удалось сохранить реузультат! Проверьте введенные данные и попробуйте еще раз.
      </div>
      <div class="form-group">
        <button class="btn btn-success" @click.prevent="submitForm">Сохранить</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'AddResults',
    props: ['climbingwall'],
    data () {
      return {
        form: {
          route: null,
          result: null
        },
      }
    },
    computed: {
      competition () {
        return this.$store.getters['competitions/competition'](this.$route.params.id)
      },
      routes () {
        return this.$store.getters['climbingwalls/climbingwall_routes'](this.climbingwall.id)
      },
      participant() {
        return this.$store.getters['users/getParticipationId'](
          this.$store.getters['auth/userId'],
          this.competition.id)
      },
      isStatusOk () {
        return this.$store.getters['users/status'] === 'ok'
      },
      isStatusError () {
        return this.$store.getters['users/status'] === 'error'
      },
      errors () {
        return this.$store.getters['users/errors']
      },
    },
    methods: {
      submitForm () {
        let data = Object.assign({}, this.form)
        data['participant'] = this.participant
        this.$store.dispatch('users/addResults', data)
      },
    },
    created() {
      this.$store.commit('users/RESET_ERRORS')
      this.$store.dispatch('climbingwalls/getClimbingwallsRoutes', climbingwall.id)
      this.$store.dispatch('competitions/getCompetition', this.$route.params.id)
      // this.$store.commit('routes/RESET_ERRORS')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
