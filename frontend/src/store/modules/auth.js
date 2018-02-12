import {Auth} from '../../api/auth'
import {HTTP} from '../../api//common'

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAIL = "LOGIN_FAIL";
const LOGOUT = "LOGOUT";

const state = {
  isLoggedIn: !!sessionStorage.getItem('token'),
  errors: {
    email: [],
    password: [],
    non_field_errors: []
  }
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
  [LOGIN_FAIL](state, {response}) {
    state.errors = response.data;
    state.pending = false;
    state.isLoggedIn = false;
  }
}

const actions = {
  login({commit}, creds) {
    commit(LOGIN); // show spinner
    Auth.login(creds).then(response => {
      if (response.key) {
        sessionStorage.setItem('token', response.key)
        commit(LOGIN_SUCCESS);
      } else {
        commit(LOGIN_FAIL, {response})
      }
    })
  },
  logout({commit}) {
    //todo
    sessionStorage.removeItem("token");
    commit(LOGOUT);
  }
}

const getters = {
  isLoggedIn: state => {
    return state.isLoggedIn
  },
  errors: state => {
    return state.errors
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
