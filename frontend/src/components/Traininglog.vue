<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <div class="shadow bg-white p-4">
          <h3>Дневник тренировок</h3>
          <b-table v-if="trainings.length" responsive striped hover :items="trainings"></b-table>
          <b-alert v-else show variant="info">
            К сожалению, вы еще не добавляли информацию о своих тренировках.
          </b-alert>
        </div>
      </b-col>
    </b-row>

    <b-row>
      <b-col sm="5">
        <div class="shadow bg-white p-4 mt-4">
          <h3>Добавление тренировки</h3>
          <b-form @submit.prevent="onSubmit" @reset="onReset">
            <b-form-group id="namegrp"
                          label="Описание:"
                          label-for="comments">
              <b-form-textarea id="comments"
                               v-model="form.comments"
                               :rows="3"
                               required
                               placeholder="Описание тренировки, результатов и т.п.">
              </b-form-textarea>
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
        </div>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
  export default {
    name: 'Traininglog',
    data() {
      return {
        trainings: [],
        form: {
          comments: ''
        },
      }
    },

    methods: {
      onReset() {
      },
      onSubmit() {
      }
    },

    created() {
      window.axios.get('http://localhost:8000/api/v1/trainingdays/').then(response => this.trainings = response.data)
    }
  }
</script>

<style scoped>
</style>
