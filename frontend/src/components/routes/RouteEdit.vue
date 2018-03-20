<template>
  <form>
    <div class="form-group">
      <label for="name">Название: </label>
      <input id="name" name="name" type="text" class="form-control" v-model="route.name">
    </div>
    <div class="form-group">
      <label for="description">Описание: </label>
      <textarea class="form-control" name="description" id="description" rows="3"
                v-model="route.description"></textarea>
    </div>
    <div class="form-group">
      <label for="address">Цвет: </label>
      <input id="address" name="address" type="text" class="form-control" v-model="route.color">
    </div>
    <div class="form-group">
      <label for="grade">Категория: </label>
      <select class="form-control" name="grade" id="grade" v-model="route.grade">
        <option value="5a">5a</option>
        <option value="5a+">5a+</option>
        <option value="5b">5b</option>
        <option value="5b+">5b+</option>
        <option value="5c">5c</option>
        <option value="5c+">5c+</option>
        <option value="6a">6a</option>
        <option value="6a+">6a+</option>
        <option value="6b">6b</option>
        <option value="6b+">6b+</option>
        <option value="6c">6c</option>
        <option value="6c+">6c+</option>
        <option value="7a">7a</option>
        <option value="7a+">7a+</option>
        <option value="7b">7b</option>
        <option value="7b+">7b+</option>
        <option value="7c">7c</option>
        <option value="7c+">7c+</option>
        <option value="8a">8a</option>
        <option value="8a+">8a+</option>
        <option value="8b">8b</option>
        <option value="8b+">8b+</option>
        <option value="8c">8c</option>
        <option value="8c+">8c+</option>
        <option value="9a">9a</option>
        <option value="9a+">9a+</option>
        <option value="9b">9b</option>
        <option value="9b+">9b+</option>
        <option value="9c">9c</option>
        <option value="9c+">9c+</option>
      </select>
    </div>
    <div class="form-group">
      <button class="btn btn-success" v-on:click.prevent="submitForm">Сохранить</button>
    </div>
  </form>
</template>

<script>
  export default {
    name: 'RouteEdit',
    props: ['route'],
    data() {
      return {
        tmpData: this.route,
      }
    },
    methods: {
      submitForm() {
        this.$store.dispatch("setRoute", this.tmpData);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
