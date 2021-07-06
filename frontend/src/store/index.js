import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// Modules
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import auth from './auth'
import users from './user-crud'
import groups from './group-crud'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    auth,
    users,
    groups,
  },
  strict: process.env.DEV,
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
})
