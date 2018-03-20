import {Routes} from '../../api/routes'

import Vue from 'vue'

const SET_ROUTE = 'SET_ROUTE'
const SET_ROUTE_PICTURES = 'SET_ROUTE_PICTURES'

const state = {
  routes: {},
  pictures: {},
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
  [SET_ROUTE](state, {route}) {
    Vue.set(state.routes, route.id, route);
  },
  [SET_ROUTE_PICTURES](state, {picture}) {
    Vue.set(state.pictures, picture.route, picture);
  }
  /*
  [SET_CLIMBINGWALL](state, {climbingwall}) {
    Vue.set(state.climbingwalls, climbingwall.id, climbingwall);
  },
  [SET_CLIMBINGWALLS](state, {climbingwalls}) {
    state.climbingwalls = climbingwalls.reduce(
      (acc, climbingwall) => {
        acc[climbingwall.id] = climbingwall;
        return acc;
      }, {}
    )
  },
  [SET_CLIMBINGWALLS_SHORT](state, {climbingwalls}) {
    state.climbingwalls_short = climbingwalls.reduce(
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
  },
  */
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
