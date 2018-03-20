<template>
  <form>
      <div class="form-group">
        <label for="name">Название: </label>
        <input id="name" name="name" type="text" class="form-control" v-model="climbingwall.name">
      </div>
      <div class="form-group">
        <label for="description">Описание: </label>
        <textarea class="form-control" name="description" id="description" rows="3"
                  v-model="climbingwall.description"></textarea>
      </div>
      <div class="form-group">
        <label for="name">Адрес: </label>
        <input id="address" name="address" type="text" class="form-control" v-model="climbingwall.address">
      </div>
      <div class="form-group">
        <label for="website">Веб-сайт: </label>
        <input id="website" name="website" type="text" class="form-control" v-model="climbingwall.website">
      </div>
      <div class="form-group">
        <label for="contacts">Контакты: </label>
        <input id="contacts" name="contacts" type="text" class="form-control" v-model="climbingwall.contacts">
      </div>
      <div class="form-group">
        <label for="open_time">Режим работы: </label>
        <input id="open_time" name="open_time" type="text" class="form-control" v-model="climbingwall.open_time">
      </div>
      <div class="form-group">
        <button class="btn btn-success" v-on:click.prevent="submitForm">Сохранить</button>
      </div>
    </form>
</template>

<script>
  export default {
    name: 'ClimbingwallEdit',
    props: ['climbingwall'],
    data() {
      return {
        tmpData: this.climbingwall,
      }
    },
    methods: {
      submitForm() {
        this.$store.dispatch("setClimbingwall", this.tmpData);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
