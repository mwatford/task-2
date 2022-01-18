import { createStore } from 'vuex'

const createNewGame = (type = '') => ({
  turnsLeft: 30,
  history: [],
  correctGuesses: 0,
  type,
})

export default createStore({
  state: { game: createNewGame() },
  mutations: {
    SET_GAME_TYPE(state, payload) {
      state.game.type = payload
    },
    SET_GAME(state, payload) {
      Object.assign(state.game, payload)
    },
    REMOVE_TURN(state) {
      state.game.turnsLeft--
    },
    UPDATE_SCORE(state) {
      state.game.correctGuesses++
    },
    UPDATE_HISTORY(state, payload) {
      state.game.history.push(payload)
    },
  },
  actions: {
    loadGame({ commit }) {
      commit('SET_GAME', JSON.parse(localStorage.getItem('game')))
    },
    createGame({ commit }, { type, data }) {
      commit('SET_GAME', createNewGame(type))
      commit('UPDATE_HISTORY', { data })
    },
  },
  getters: {
    isGameOver: state => state.game.turnsLeft < 1,
    initGame: state => state.game.history.length < 1,
  },
  modules: {},
})
