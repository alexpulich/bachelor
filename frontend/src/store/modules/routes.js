import { Routes } from '../../api/routes'

import Vue from 'vue'

const SET_ROUTE = 'SET_ROUTE'
const SET_ROUTES_SHORT = 'SET_ROUTES_SHORT'
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
  routes_short: {},

  errors: [],
  status: NONE_STATUS,
}

const getters = {
  route: (state) => (id) => {
    return state.routes[id]
  },
  pictures: (state) => (id) => {
    return state.pictures[id]
  },
  errors: state => state.errors,
  status: state => state.status,
  routesShort: (state) => state.routes_short
}

const mutations = {
  [SET_ROUTE] (state, {route}) {
    Vue.set(state.routes, route.id, route)
  },
  [SET_ROUTE_PICTURES] (state, {pictures}) {
    Vue.set(state.pictures, pictures[0].route, pictures)
  },
  [SET_ROUTES_SHORT] (state, {routes}) {
    state.routes_short = routes.reduce(
      (acc, route) => {
        acc[route.id] = route
        return acc
      }, {},
    )
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
  getRoute ({commit}, id) {
    Routes.item(id).then(route => {
      commit(SET_ROUTE, {route})
    })
  },
  getPictures ({commit}, id) {
    Routes.pictures(id).then(pictures => {
      commit(SET_ROUTE_PICTURES, {pictures})
    })
  },
  setRoute ({commit, dispatch}, route) {
    commit(RESET_ERRORS)
    Routes.set(route).then(response => {
      if (response.errors) {
        commit(FORM_FAIL, {'errors': response.errors})
      } else {
        commit(FORM_SUCCESS)
        dispatch('getRoute', route.id)
      }
    })
  },
  uploadImage ({commit, dispatch}, image) {
    commit(RESET_ERRORS)
    Routes.uploadPicture(image).then(response => {
      if (response.errors) {
        commit(FORM_FAIL, {'errors': response.errors})
      } else {
        commit(FORM_SUCCESS)
        dispatch('getPictures', image.route)
      }
    })
  },
  deleteImage ({commit, dispatch}, image) {
    commit(RESET_ERRORS)
    Routes.deletePicture({id: image.id, active: false}).then(response => {
      if (response.errors) {
        commit(FORM_FAIL, {'errors': response.errors})
      } else {
        commit(FORM_SUCCESS)
        dispatch('getPictures', image.route)
      }
    })
  },
  getRoutesShort({commit}) {
    Routes.short().then(routes => {
      commit(SET_ROUTES_SHORT, {routes})
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
