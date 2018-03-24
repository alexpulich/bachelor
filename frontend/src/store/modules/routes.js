import {Routes} from '../../api/routes'

import Vue from 'vue'

const SET_ROUTE = 'SET_ROUTE'
const SET_ROUTE_PICTURES = 'SET_ROUTE_PICTURES'

const FORM_FAIL = 'FORM_FAIL'
const FORM_SUCCESS = 'FORM_SUCCESS'
const RESET_ERRORS = 'RESET_ERRORS'

const OK_STATUS = 'ok'
const ERROR_STATUS = 'error'
const NONE_STATUS = 'none'

const state = {
  routes: {},
  pictures: {},

  errors: [],
  status: NONE_STATUS
}

const getters = {
  route: (state) => (id) => {
    return state.routes[id]
  },
  routePictures: (state) => (id) => {
    return state.pictures[id]
  },
  errors: state => state.errors,
  status: state => state.status,
}

const mutations = {
  [SET_ROUTE] (state, {route}) {
    Vue.set(state.routes, route.id, route);
  },
  [SET_ROUTE_PICTURES] (state, {picture}) {
    Vue.set(state.pictures, picture.route, picture);
  },

  [FORM_FAIL] (state, {errors}) {
    state.errors = errors
    state.status = ERROR_STATUS
  },
  [FORM_SUCCESS] (state) {
    state.errors = []
    state.status = OK_STATUS
  },
  [RESET_ERRORS] (state) {
    state.errors = []
    state.status = NONE_STATUS
  },
}

const actions = {
  getRoute({commit}, id) {
    Routes.item(id)
      .then(route => {
        commit(SET_ROUTE, {route})
      })
  },
  getPictures({commit}, id) {
    Routes.pictures(id)
      .then(pictures => {
        commit(SET_ROUTE_PICTURES, {pictures});
        console.log(pictures);
      })
  },
  setRoute({commit, dispatch}, route) {
    commit(RESET_ERRORS)
    Routes.set(route)
      .then(response => {
        console.log(response);
        if (response.errors) {
          commit(FORM_FAIL, {'errors': response.errors})
        } else {
          commit(FORM_SUCCESS)
          dispatch('getRoute', route.id)
        }
    })
  },
  /*
  getClimbingwalls({commit}) {
    Climbingwalls.list()
      .then(climbingwalls => {
        commit(SET_CLIMBINGWALLS, {climbingwalls});
      })
  },
  getClimbingwallsShort({commit}) {
    Climbingwalls.short()
      .then(climbingwalls => {
        commit(SET_CLIMBINGWALLS_SHORT, {climbingwalls});
      })
  },
  getClimbingwallsRoutes({dispatch, commit}, id) {
    commit(SET_CURRENT_CLIMBINGWALL, {id});
    Climbingwalls.routes(id).then((routes) => {
      commit(SET_CLIMBINGWALLS_ROUTES, {routes})
      routes.forEach(function(item, i, arr) {
          dispatch('getUser', item.author)
        })
    })
    ;
  },
  setClimbingwall({commit}, climbingwall) {
    Climbingwalls.set(climbingwall)
      .then(response => {})
  },
  addRoute({commit}, route) {
    Routes.add(route)
      .then(response => {
        commit(ADD_ROUTE, {route})
      })
  }
  */
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
