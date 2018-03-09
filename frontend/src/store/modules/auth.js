import {Auth} from '../../api/auth'
import {HTTP} from '../../api//common'
import router from '../../router'
import VueJwtDecode from 'vue-jwt-decode'


const EMPTY_ERRORS = "EMPTY_ERRORS";
const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAIL = "LOGIN_FAIL";
const LOGOUT = "LOGOUT";
const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
const REGISTRATION_FAIL = "REGISTRATION_FAIL";

const state = {
  isLoggedIn: !!sessionStorage.getItem('token'),
  userId: (sessionStorage.getItem('token')) ? VueJwtDecode.decode(sessionStorage.getItem('token')).user_id : 0,
  errors: [],
  pending: false
}

const mutations = {
  [EMPTY_ERRORS](state) {
    state.errors = [];
  },
  [LOGIN](state) {
    state.pending = true;
  },
  [LOGIN_SUCCESS](state) {
    state.isLoggedIn = true;
    state.pending = false;
    state.user_id = VueJwtDecode.decode(sessionStorage.getItem('token')).user_id;
  },
  [REGISTRATION_SUCCESS](state) {
    state.isLoggedIn = true;
    state.pending = false;
  },
  [LOGOUT](state) {
    state.isLoggedIn = false;
    state.user_id = 0;
  },
  [LOGIN_FAIL](state, {response}) {
    state.pending = false;
    state.isLoggedIn = false;
    state.errors = response
  },
  [REGISTRATION_FAIL](state, {response}) {
    state.pending = false;
    state.isLoggedIn = false;
    state.errors = response
  }
}

const actions = {
  login({commit}, creds) {
    commit(EMPTY_ERRORS);
    commit(LOGIN); // show spinner
    Auth.login(creds)
      .then(response => {
        if ('token' in response) {
          sessionStorage.setItem('token', response.token)
          commit(EMPTY_ERRORS);
          commit(LOGIN_SUCCESS);
          router.push('/')
        } else {
          commit(LOGIN_FAIL, {response})
        }
      })
  },
  logout({commit}) {
    sessionStorage.removeItem("token");
    commit(LOGOUT);
  },
  registration({commit}, data) {
    commit(LOGIN); // show spinner
    Auth.registration(data).then(response => {
      if ('key' in response) {
        sessionStorage.setItem('token', response.key)
        commit(EMPTY_ERRORS);
        commit(REGISTRATION_SUCCESS);
        router.push('/')
      } else {
        commit(REGISTRATION_FAIL, {response})
      }
    })
  },
  emptyErrors({commit}, data) {
    commit(EMPTY_ERRORS)
  }
}

const getters = {
  userId: state => state.userId,
  isLoggedIn: state => {
    return state.isLoggedIn
  },
  errors: state => {
    return state.errors
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
