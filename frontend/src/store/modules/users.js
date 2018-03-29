import { Users } from '../../api/users'

import Vue from 'vue'

const SET_USERS = 'SET_USERS'
const SET_USER = 'SET_USER'
const SET_PROFILE = 'SET_PROFILE'
const SET_USER_ROUTES = 'SET_USER_ROUTES'

const FORM_FAIL = 'FORM_FAIL'
const FORM_SUCCESS = 'FORM_SUCCESS'
const RESET_ERRORS = 'RESET_ERRORS'

const OK_STATUS = 'ok'
const ERROR_STATUS = 'error'
const NONE_STATUS = 'none'

const state = {
  users: {},
  profiles: {},
  userRoutes: {},

  errors: [],
  status: NONE_STATUS
}

const getters = {
  users: state => state.users,
  user: (state) => (id) => {
    return state.users[id]
  },
  profile: (state) => (id) => {
    return state.profiles[id]
  },
  userRoutes: (state) => (id) => {
    return state.userRoutes[id]
  },
  errors: state => state.errors,
  status: state => state.status,
}

const mutations = {
  [SET_USERS] (state, {users}) {
    state.users = users.reduce(
      (acc, user) => {
        acc[user.id] = user
        return acc
      }, {},
    )
  },
  [SET_USER] (state, {user}) {
    Vue.set(state.users, user.id, user)
  },
  [SET_PROFILE] (state, {profile}) {
    Vue.set(state.profiles, profile.user, profile)
  },
  [SET_USER_ROUTES] (state, {routes}) {
    if (routes) {
      let tmp_routes = routes.reduce(
        (acc, route) => {
          acc[route.id] = route
          return acc
        }, {},
      )
      Vue.set(state.userRoutes, routes[0].author, tmp_routes)
    }
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
  getUsers ({commit}) {
    Users.list().then(users => {
      commit(SET_USERS, {users})
    })
  },
  getUser ({commit, state}, id) {
    Users.item(id).then(user => {
      commit(SET_USER, {user})
      Users.profile(user.profile).then(profile => {
        commit(SET_PROFILE, {profile})
        Users.routes(profile.user).then(routes => {
          commit(SET_USER_ROUTES, {routes})
        })
      })
    })
  },
  setUser ({commit, dispatch}, user) {
    commit(RESET_ERRORS)
    if (user.photo && !user.photo.startsWith('http')) {
      let photo = {
        id: user.id,
        user: user.user,
        photo: user.photo,
      }
      delete user['photo']
      Users.set(photo).then(response => {
        if (response.errors) {
          commit(FORM_FAIL, {'errors': response.errors})
        } else {
          Users.set(user).then(response => {
            if (response.errors) {
              commit(FORM_FAIL, {'errors': response.errors})
            } else {
              commit(FORM_SUCCESS)
              dispatch('getUser', user.user)
            }
          })
        }
      })
    } else {
      if (user.photo) {
        delete user['photo']
      }
      Users.set(user).then(response => {
        if (response.errors) {
          commit(FORM_FAIL, {'errors': response.errors})
        } else {
          commit(FORM_SUCCESS)
          dispatch('getUser', user.user)
        }
      })
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
