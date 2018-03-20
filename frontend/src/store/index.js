import Vue from 'vue'
import Vuex from 'vuex'
import climbingwalls from './modules/climbingwalls'
import auth from './modules/auth'
import users from './modules/users'
import routes from './modules/routes'

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    climbingwalls,
    auth,
    users,
    routes
  },
})
