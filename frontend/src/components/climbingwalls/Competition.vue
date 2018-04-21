<template>
  <div class="shadow bg-white p-4 border rounded">
    <h2>
      <small>
        <!--<router-link :to="{ name: 'Climbingwall', params: { id: climbingwall.id }}"><i class="fa fa-arrow-left"></i>-->
        <!--</router-link>-->
      </small>
      {{ competition.name }}
    </h2>
    <p class="text">
      {{ competition.description }}
    </p>
    <p class="text"><strong>Дата проведения: </strong>{{ competition.date | luxon }}</p>
    <h2>Результаты:</h2>
    <table class="table table-striped">
      <thead>
      <tr>
        <th scope="col">Место</th>
        <th scope="col">Скалолаз</th>
        <th scope="col">Кол-во очков</th>
        <th scope="col">Кол-во трасс</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(result, index) in results">
        <td>{{ index + 1 }}</td>
        <td>{{ result.first_name + ' ' + result.last_name }}</td>
        <td>{{ result.points}}</td>
        <td>{{ result.routes}}</td>
      </tr>
      </tbody>
    </table>
    <p>
      <router-link :to="{ name: 'AddResults', params: { id: competition.id }}" class="btn btn-primary"><i class="fa fa-plus"></i> Добавить Результат</router-link>
    </p>
  </div>
</template>

<script>
  // import climbingwalls from '../../store/modules/climbingwalls'

  export default {
    name: 'Competition',
    // props: ['climbingwall', 'kinds'],
    data () {
      return {
        /*
        form: {
          logo: this.climbingwall.logo, //todo
          id: this.climbingwall.id,
          name: this.climbingwall.name,
          routes: this.climbingwall.routes,
          description: this.climbingwall.description,
          address: this.climbingwall.address,
          website: this.climbingwall.website,
          kinds: this.climbingwall.kinds,
          contacts: this.climbingwall.contacts,
//          networks: null //todo,
          open_time: this.climbingwall.open_time,
        },
        */
      }
    },
    computed: {
      competition () {
        return this.$store.getters['competitions/competition'](this.$route.params.id)
      },
      results () {
        return this.$store.getters['competitions/results'](this.$route.params.id)
      },
      /*
      isStatusOk () {
        return this.$store.getters['climbingwalls/status']=== 'ok'
      },
      isStatusError () {
        return this.$store.getters['climbingwalls/status'] === 'error'
      },
      errors () {
        return this.$store.getters['climbingwalls/errors']
      },
      options () {
        let tmp = []
        this.form.kinds.forEach(function (item, i, arr) {
          tmp.push({
            text: item.name,
            value: item.id,
          })
        })
        return tmp
      },
      */
    },
    methods: {
      /*
      submitForm () {
        this.$store.dispatch('climbingwalls/setClimbingwall', Object.assign({}, this.form))
      },
      processFile (event) {
        var input = event.target
        // Ensure that you have a file before attempting to read it
        if (input.files && input.files[0]) {
          // create a new FileReader to read this image and convert to base64 format
          var reader = new FileReader()
          // Define a callback function to run, when FileReader finishes its job
          reader.onload = (e) => {
            // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
            // Read image as base64 and set to imageData
            this.form.logo = e.target.result
          }
          // Start the reader job - read file as a data url (base64 format)
          reader.readAsDataURL(input.files[0])
        }
//         this.form.logo = event.target.files[0];
//        console.log(event.target.files[0]);
      },
      */
    },
    created () {
      this.$store.dispatch('competitions/getCompetition', this.$route.params.id)
      this.$store.dispatch('competitions/getResults', this.$route.params.id)
      /*
      this.$store.commit('climbingwalls/RESET_ERRORS')
      this.$store.dispatch('climbingwalls/getKinds')
      */
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .preview {
    height: 150px;
  }
</style>
