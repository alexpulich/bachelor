import {Climbingwalls} from '../../api/climbingwalls'

const state = {
  climbingwalls: []
}

const getters = {
  climbingwalls: state => state.climbingwalls
}

const mutations = {
  setClimbingwalls(state, {climbingwalls}) {
    state.climbingwalls = climbingwalls
  }
}

const actions = {
  getClimbingwalls({commit}) {
    Climbingwalls.list().then(climbingwalls => {
      commit('setClimbingwalls', {climbingwalls})
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
