import {Auth} from '../../api/auth'
import {HTTP} from '../../api//common'

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAIL = "LOGIN_FAIL";
const LOGOUT = "LOGOUT";

const state = {
  isLoggedIn: !!sessionStorage.getItem('token'),
}

const mutations = {
  [LOGIN](state) {
    state.pending = true;
  },
  [LOGIN_SUCCESS](state) {
    state.isLoggedIn = true;
    state.pending = false;
  },
  [LOGOUT](state) {
    state.isLoggedIn = false;
  },
  [LOGIN_FAIL](state, {error}) {
    state.pending = false;
    state.isLoggedIn = false;
  }
}

const actions = {
  login({commit}, creds) {
    return new Promise((resolve, reject) => {
      commit(LOGIN); // show spinner
      Auth.login(creds)
        .then(response => {
          sessionStorage.setItem('token', response.data.key)
          commit(LOGIN_SUCCESS);
          resolve()
        })
        .catch(error => {
          commit(LOGIN_FAIL, {error})
          reject(error.response.data)
        })
    })
  },
  logout
    ({commit}) {
    //todo
    sessionStorage.removeItem("token");
    commit(LOGOUT);
  }
}

const getters = {
  isLoggedIn: state => {
    return state.isLoggedIn
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
