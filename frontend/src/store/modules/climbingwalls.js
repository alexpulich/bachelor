import {Climbingwalls} from '../../api/climbingwalls'
import {Routes} from '../../api/routes'

import Vue from 'vue'

const SET_CLIMBINGWALLS = "SET_CLIMBINGWALLS";
const SET_CLIMBINGWALLS_ROUTES = "SET_CLIMBINGWALLS_ROUTES";
const SET_CLIMBINGWALLS_ROUTES_AUTHORS = "SET_CLIMBINGWALLS_ROUTES_AUTHORS";
const SET_CURRENT_CLIMBINGWALL = "SET_CURRENT_CLIMBINGWALL";

const ADD_ROUTE = "ADD_ROUTE";

const state = {
  climbingwalls: {},
  climbingwalls_routes: {},
  climbingwalls_routes_authors: {},
  current_climbingwall: 0
}

const getters = {
  climbingwalls: state => state.climbingwalls,
  climbingwall: (state) => (id) => {
    return state.climbingwalls[id]
  },
  climbingwall_routes: (state) => (id) => {
    return state.climbingwalls_routes[id];
  }
}

const mutations = {
  [SET_CLIMBINGWALLS](state, {climbingwalls}) {
    state.climbingwalls = climbingwalls.reduce(
      (acc, climbingwall) => {
        acc[climbingwall.id] = climbingwall;
        return acc;
      }, {}
    )
  },
  [SET_CLIMBINGWALLS_ROUTES](state, {routes}) {
    if (state.current_climbingwall != 0 && routes) {
      Vue.set(state.climbingwalls_routes, state.current_climbingwall, routes.reduce(
        (acc, route) => {
          acc[route.id] = route;
          return acc;
        }, {}
      ))
    }
  },
  [SET_CURRENT_CLIMBINGWALL](state, {id}) {
    state.current_climbingwall = id;
  },

  [ADD_ROUTE](state, {route}) {
    Vue.set(state.climbingwalls_routes[state.current_climbingwall], route.id, route)
  }
}

const actions = {
  getClimbingwalls({commit}) {
    Climbingwalls.list().then(climbingwalls => {
      commit(SET_CLIMBINGWALLS, {climbingwalls})
    });
  },
  getClimbingwallsRoutes({commit}, id) {
    commit(SET_CURRENT_CLIMBINGWALL, {id});
    Climbingwalls.routes(id).then((routes) => {
      commit(SET_CLIMBINGWALLS_ROUTES, {routes})
    });
  },
  addRoute({commit}, route) {
    Routes.add(route)
      .then(response => {
        console.log(route);
        commit(ADD_ROUTE, {route})
      })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
