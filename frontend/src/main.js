// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import VueGallery from 'vue-gallery'
import Vue from 'vue'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'
import VueCarousel from 'vue-carousel';
import App from './App'
import router from './router'
import store from './store'

import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

// import 'vue-event-calendar/dist/style.css' //^1.1.10, CSS has been extracted as one file, so you can easily update it.
import './assets/event-calendar.css'
import vueEventCalendar from 'vue-event-calendar'

Vue.use(vueEventCalendar, {locale: 'ru', weekStartOn: 1})
Vue.component('datetime', Datetime);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(Vuex)
Vue.component('gallery', VueGallery)
Vue.use(VueCarousel);
Vue.use(Datetime)

const VueLuxon = require('vue-luxon');
Vue.use(VueLuxon);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})

router.beforeEach((to, from, next) => {
  const authRequired = to.matched.some((route) => route.meta.auth)
  const authed = store.state.auth.isLoggedIn
  if (authRequired && !authed) {
    next('/login?from=' + to.path)
  } else {
    next()
  }
})
