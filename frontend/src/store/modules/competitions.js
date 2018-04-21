import { Competitions } from '../../api/competitions'

import Vue from 'vue'

const SET_COMPETITION = 'SET_COMPETITION'
const SET_RESULTS = 'SET_RESULTS'


const state = {
  competitions: {},
  results: {}
}

const getters = {
  competition: (state) => (id) => state.competitions[id],
  results: (state) => (id) => state.results[id]
}

const mutations = {
  [SET_COMPETITION] (state, {competition}) {
    Vue.set(state.competitions, competition.id, competition)
  },
  [SET_RESULTS] (state, {results, id}) {
    Vue.set(state.results, id, results)
  }
}

const actions = {
  getCompetition({commit}, id) {
    Competitions.item(id).then(competition => {
      commit(SET_COMPETITION, {competition})
    })
  },
  getResults({commit}, id) {
    Competitions.results(id).then(results => {
      commit(SET_RESULTS, {results, id})
    })
  }
  // getClimbingwall ({commit}, id) {
  //   Climbingwalls.item(id).then(climbingwall => {
  //     commit(SET_CLIMBINGWALL, {climbingwall})
  //   })
  // },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
