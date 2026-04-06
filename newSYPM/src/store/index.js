import { createStore } from 'vuex'

export default createStore({
  state: {
    gameOpen: false,
    currentGame: '',
    currentCharacter: null,
    currentNews: null
  },
  mutations: {
    setGameOpen(state, status) {
      state.gameOpen = status
    },
    setCurrentGame(state, game) {
      state.currentGame = game
    },
    setCurrentCharacter(state, character) {
      state.currentCharacter = character
    },
    setCurrentNews(state, news) {
      state.currentNews = news
    }
  },
  actions: {
    openGame({ commit }, game) {
      commit('setCurrentGame', game)
      commit('setGameOpen', true)
    },
    closeGame({ commit }) {
      commit('setGameOpen', false)
      commit('setCurrentGame', '')
    },
    setCharacter({ commit }, character) {
      commit('setCurrentCharacter', character)
    },
    setNews({ commit }, news) {
      commit('setCurrentNews', news)
    }
  },
  getters: {
    isGameOpen: state => state.gameOpen,
    currentGame: state => state.currentGame,
    currentCharacter: state => state.currentCharacter,
    currentNews: state => state.currentNews
  }
})
