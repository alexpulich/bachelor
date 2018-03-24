import {Users} from '../../api/users'

import Vue from 'vue'

const SET_USERS = "SET_USERS";
const SET_USER = "SET_USER";


const state = {
  users: {}
}

const getters = {
  users: state => state.users,
  user: (state) => (id) => {
    return state.users[id]
  }
}

const mutations = {
  [SET_USERS](state, {users}) {
    state.users = users.reduce(
      (acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {}
    )
  },
  [SET_USER](state, {user}) {
    Vue.set(state.users, user.id, user)
  },
}

const actions = {
  getUsers({commit}) {
    Users.list()
      .then(climbingwalls => {
        commit(SET_CLIMBINGWALLS, {climbingwalls});
      })
  },
  getUser({commit, state}, id) {
    Users.item(id)
      .then(user => {
        commit(SET_USER, {user});
      })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
