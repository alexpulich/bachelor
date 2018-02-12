import Vue from 'vue'
import Vuex from 'vuex'
import { Climbingwalls } from '../api/climbingwall'
import {
  ADD_CLIMBINGWALL,
  REMOVE_CLIMBINGWALL,
  SET_CLIMBINGWALLS
} from './mutation-types.js'

Vue.use(Vuex)

// Состояние
const state = {
  climbingwalls: []  // список заметок
}

// Геттеры
const getters = {
  climbingwalls: state => state.climbingwalls  // получаем список заметок из состояния
}

// Мутации
const mutations = {
  // Добавляем заметку в список
  // [ADD_NOTE] (state, note) {
  //   state.notes = [note, ...state.notes]
  // },
  // Убираем заметку из списка
  // [REMOVE_NOTE] (state, { id }) {
  //   state.notes = state.notes.filter(note => {
  //     return note.id !== id
  //   })
  // },
  // Задаем список заметок
  [SET_CLIMBINGWALLS] (state, { climbingwalls }) {
    state.climbingwalls = climbingwalls
  }
}

// Действия
const actions = {
  // createNote ({ commit }, noteData) {
  //   Note.create(noteData).then(note => {
  //     commit(ADD_NOTE, note)
  //   })
  // },
  // deleteNote ({ commit }, note) {
  //   Note.delete(note).then(response => {
  //     commit(REMOVE_NOTE, note)
  //   })
  // },
  getClimbingwalls ({ commit }) {
    Climbingwalls.list().then(climbingwalls => {
      commit(SET_CLIMBINGWALLS, { climbingwalls })
    })
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
