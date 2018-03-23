import {Routes} from '../../api/routes'

import Vue from 'vue'

const SET_ROUTE = 'SET_ROUTE'
const SET_ROUTE_PICTURES = 'SET_ROUTE_PICTURES'

const state = {
  routes: {},
  pictures: {}
}

const getters = {
  route: (state) => (id) => {
    return state.routes[id]
  },
  routePictures: (state) => (id) => {
    return state.pictures[id]
  }
}

const mutations = {
  [SET_ROUTE] (state, {route}) {
    Vue.set(state.routes, route.id, route);
  },
  [SET_ROUTE_PICTURES] (state, {picture}) {
    Vue.set(state.pictures, picture.route, picture);
  }
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
  setRoute({commit}, route) {
    Routes.set(route)
      .then(response => {})
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
  state,
  getters,
  actions,
  mutations
}
