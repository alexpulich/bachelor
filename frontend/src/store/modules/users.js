import { Users } from '../../api/users'

import Vue from 'vue'

const SET_USERS = 'SET_USERS'
const SET_USER = 'SET_USER'
const SET_PROFILE = 'SET_PROFILE'
const SET_USER_ROUTES = 'SET_USER_ROUTES'
const SET_TRAININGS = 'SET_TRAININGS'
const SET_TRAININGS_ROUTES = 'SET_TRAININGS_ROUTES'

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
  trainings: {},
  trainingsRoutes: {},

  errors: [],
  status: NONE_STATUS,
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
  userTrainings: (state) => (id) => {
    return state.trainings[id]
  },
  userTrainingsCalendar: (state) => (id) => {
    let calendar = []
    state.trainings[id].forEach(function (item, i, index) {
      let date = new Date(item.start_date)
      let dateStr = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' +
        date.getDate()
      calendar.push({
        date: dateStr,
        title: 'title',
        index: i,
      })
    })
    // calendar = state.trainings[id].reduce(
    //   (acc, day) => {
    //     let date = new Date(day.start_date)
    //     let dateStr = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' +
    //       date.getDate()
    //     calendar.push({date: dateStr, title: 'hey'})
    //     return acc
    //   }, {},
    // )
    return calendar
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
  [SET_TRAININGS] (state, {trainings}) {
    if (trainings[0])
      Vue.set(state.trainings, trainings[0].user, trainings)
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
  getUser ({commit}, id) {
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
  getTrainings ({commit}, id) {
    Users.trainings(id).then(trainings => {
      commit(SET_TRAININGS, {trainings})
    })
  },
  setTraining ({commit, dispatch}, training) {
    let routes = training['training_routes']
    training['training_routes'] = []
    Users.createTraining(training).then(response => {
      if (response.errors) {
        commit(FORM_FAIL, {'errors': response.errors})
      } else {
        if (routes.length) {
          routes.forEach(function (item, i, arr) {
            item['training_day'] = response.id
            Users.setTrainingRoute(item).then(routes_response => {
              if (routes_response.errors) {
                commit(FORM_FAIL, {'errors': routes_response.errors})
              } else {
                commit(FORM_SUCCESS)
              }
            })
          })
        } else {
          commit(FORM_SUCCESS)
        }
      }
    })
    dispatch('getTrainings', training.user)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
