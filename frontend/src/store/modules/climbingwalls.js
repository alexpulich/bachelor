import { Climbingwalls } from '../../api/climbingwalls'
import { Routes } from '../../api/routes'
import { Misc } from '../../api/misc'

import Vue from 'vue'

const SET_CLIMBINGWALL = 'SET_CLIMBINGWALL'
const SET_CLIMBINGWALLS = 'SET_CLIMBINGWALLS'
const SET_CLIMBINGWALLS_SHORT = 'SET_CLIMBINGWALLS_SHORT'
const SET_CLIMBINGWALLS_ROUTES = 'SET_CLIMBINGWALLS_ROUTES'
const SET_CURRENT_CLIMBINGWALL = 'SET_CURRENT_CLIMBINGWALL'
const SET_CLIMBINGWALL_PICTURES = 'SET_CLIMBINGWALL_PICTURES'

const FORM_FAIL = 'FORM_FAIL'
const FORM_SUCCESS = 'FORM_SUCCESS'
const RESET_ERRORS = 'RESET_ERRORS'

const SET_KINDS = 'SET_KINDS'

const ADD_ROUTE = 'ADD_ROUTE'

const OK_STATUS = 'ok'
const ERROR_STATUS = 'error'
const NONE_STATUS = 'none'

const state = {
  climbingwalls: {},
  climbingwalls_short: {},
  climbingwalls_routes: {},
  current_climbingwall: 0,
  pictures: {},

  kinds: {},

  errors: [],
  status: NONE_STATUS,
}

const getters = {
  climbingwalls: state => state.climbingwalls,
  climbingwalls_short: state => state.climbingwalls_short,
  climbingwall: (state) => (id) => {
    return state.climbingwalls[id]
  },
  climbingwall_routes: (state) => (id) => {
    return state.climbingwalls_routes[id]
  },
  pictures: state => (id) => {
    return state.pictures[id]
  },
  kinds: state => state.kinds,
  errors: state => state.errors,
  status: state => state.status,
}

const mutations = {
  //Сохранить скалодром в стейт
  [SET_CLIMBINGWALL] (state, {climbingwall}) {
    Vue.set(state.climbingwalls, climbingwall.id, climbingwall)
  },
  [SET_CLIMBINGWALL_PICTURES] (state, {pictures}) {
    Vue.set(state.pictures, pictures[0].route, pictures)
  },
  //Сохранить скалодромЫ в стейт
  [SET_CLIMBINGWALL_PICTURES] (state, {pictures}) {
    if (pictures.length) {
      Vue.set(state.pictures, pictures[0].climbingwall, pictures)
    }
  },
  //Сохранить лист короткой инфы скалодромов в стейт
  [SET_CLIMBINGWALLS_SHORT] (state, {climbingwalls}) {
    state.climbingwalls_short = climbingwalls.reduce(
      (acc, climbingwall) => {
        acc[climbingwall.id] = climbingwall
        return acc
      }, {},
    )
  },
  [SET_CLIMBINGWALLS_ROUTES] (state, {routes}) {
    if (state.current_climbingwall != 0 && routes) {
      Vue.set(state.climbingwalls_routes, state.current_climbingwall,
        routes.reduce(
          (acc, route) => {
            acc[route.id] = route
            return acc
          }, {},
        ))
    }
  },
  [SET_CURRENT_CLIMBINGWALL] (state, {id}) {
    state.current_climbingwall = id
  },

  [ADD_ROUTE] (state, {route}) {
    Vue.set(state.climbingwalls_routes[state.current_climbingwall], route.id,
      route)
  },

  [SET_KINDS] (state, {kinds}) {
    state.kinds = kinds.reduce(
      (acc, kind) => {
        acc[kind.id] = kind
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
  getClimbingwall ({commit}, id) {
    Climbingwalls.item(id).then(climbingwall => {
      commit(SET_CLIMBINGWALL, {climbingwall})
    })
  },
  getClimbingwalls ({commit}) {
    Climbingwalls.list().then(climbingwalls => {
      commit(SET_CLIMBINGWALLS, {climbingwalls})
    })
  },
  getClimbingwallsShort ({commit}) {
    Climbingwalls.short().then(climbingwalls => {
      commit(SET_CLIMBINGWALLS_SHORT, {climbingwalls})
    })
  },
  getClimbingwallsRoutes ({dispatch, commit}, id) {
    commit(SET_CURRENT_CLIMBINGWALL, {id})
    Climbingwalls.routes(id).then((routes) => {
      commit(SET_CLIMBINGWALLS_ROUTES, {routes})
    })

  },
  setClimbingwall ({commit, dispatch}, climbingwall) {
    commit(RESET_ERRORS)
    if (climbingwall.logo && !climbingwall.logo.startsWith('http')) {
      let logo = {
        id: climbingwall.id,
        logo: climbingwall.logo,
      }
      delete climbingwall['logo']
      Climbingwalls.set(logo).then(response => {
        if (response.errors) {
          commit(FORM_FAIL, {'errors': response.errors})
        } else {
          Climbingwalls.set(climbingwall).then(response => {
            if (response.errors) {
              commit(FORM_FAIL, {'errors': response.errors})
            } else {
              commit(FORM_SUCCESS)
              dispatch('getClimbingwall', climbingwall.id)
            }
          })
        }
      })
    } else {
      if (climbingwall.logo) {
        delete climbingwall['logo']
      }
      Climbingwalls.set(climbingwall).then(response => {
        if (response.errors) {
          commit(FORM_FAIL, {'errors': response.errors})
        } else {
          commit(FORM_SUCCESS)
          dispatch('getClimbingwall', climbingwall.id)
        }
      })
    }
  },
  addRoute ({commit}, route) {
    Routes.add(route).then(response => {
      commit(ADD_ROUTE, {route})
    })
  },
  getKinds ({commit}) {
    Misc.kinds().then(kinds => {
      commit(SET_KINDS, {kinds})
    })
  },
  getPictures ({commit}, id) {
    Climbingwalls.pictures(id).then(pictures => {
      commit(SET_CLIMBINGWALL_PICTURES, {pictures})
    })
  },
  uploadImage ({commit, dispatch}, image) {
    commit(RESET_ERRORS)
    Climbingwalls.uploadPicture(image).then(response => {
      if (response.errors) {
        commit(FORM_FAIL, {'errors': response.errors})
      } else {
        commit(FORM_SUCCESS)
        dispatch('getPictures', image.climbingwall)
      }
    })
  },
  deleteImage ({commit, dispatch}, image) {
    commit(RESET_ERRORS)
    Climbingwalls.deletePicture({id: image.id, active: false}).then(response => {
      if (response.errors) {
        commit(FORM_FAIL, {'errors': response.errors})
      } else {
        commit(FORM_SUCCESS)
        dispatch('getPictures', image.climbingwall)
      }
    })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
