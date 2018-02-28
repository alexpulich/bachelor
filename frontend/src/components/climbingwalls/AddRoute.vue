<template>
  <div>
    <h4>Добавить трассу</h4>
    <b-form @submit.prevent="onSubmit" @reset="onReset">
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
        <b-form-select id="grade" v-model="form.grade" :options="options" required/>
      </b-form-group>
      <b-form-group id="colorgrp"
                    label="Цвет:"
                    label-for="color">
        <b-form-input id="color"
                      type="text"
                      v-model="form.color"
                      required
                      placeholder="Цвет меток">
        </b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Добавить трассу</b-button>
      <b-button type="reset" variant="danger">Сбросить форму</b-button>
    </b-form>
  </div>
</template>

<script>
  import {HTTP} from '../../api/common'
  export default {
    name: 'AddRoute',
    data() {
      return {
        form: {
          id: 0,
          name: '',
          color: '',
          grade: null,
          rank: 0,
          climbingwall: HTTP.defaults.baseURL+'climbingwalls/'+this.$route.params.id+'/',
          //TODO активной трасса должна быть только от проверенных людей
          active: 'true',
          //TODO захардкодил себя автором!!!
          author: HTTP.defaults.baseURL+'users/'+1+'/'
        },
        options: [
          { value: null, text: 'Категория сложности' },
          '5a', '5a+', '5b', '5b+', '5c', '5c+',
          '6a', '6a+', '6b', '6b+', '6c', '6c+',
          '7a', '7a+', '7b', '7b+', '7c', '7c+',
          '8a', '8a+', '8b', '8b+', '8c', '8c+',
          '9a', '9a+', '9b', '9b+', '9c', '9c+'
        ],
      }
    },
    computed: {
    },
    methods: {
      onSubmit() {
        this.$store.dispatch('addRoute', this.form)
      },
      onReset() {
        this.form.id = 0;
        this.form.name = '';
        this.form.color = '';
        this.form.grade = null;
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .logo {
    max-height: 200px;
  }
</style>
