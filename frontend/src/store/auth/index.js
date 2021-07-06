import $http from '../../libs/axios'

// const cookie = $cookies.get('XSRF-TOKEN')
const token = localStorage.getItem('token')
const user = JSON.parse(localStorage.getItem('user'))
const initialState = token
  ? { status: { loggedIn: true }, token, user }
  : { status: { loggedIn: false }, token: null, user: null }
export default {
  // namespaced: true,
  state: {
    initialState,
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, jwt) {
      state.status = 'success'
      state.token = jwt
    },
    auth_error(state) {
      state.status = 'error'
    },
    user(state, userData) {
      state.user = userData
    },
    logout(state) {
      state.user = null
      state.initialState.token = null
      state.initialState.status = null
    },
  },
  actions: {
    login({ commit }, user) {
      console.log(user)
      return new Promise((resolve, reject) => {
        commit('auth_request')
        $http({ url: 'api/login', data: user, method: 'POST' })
          .then(resp => {
            const jwt = resp.data.token
            const userData = resp.data.user.user
            console.log(jwt, jwt.plainTextToken)
            console.log('User', userData)
            commit('auth_success', jwt, userData)
            // commit('user', userData)

            localStorage.setItem('token', JSON.stringify(jwt))
            localStorage.setItem('token-plain', jwt.plainTextToken)
            localStorage.setItem('user', JSON.stringify(userData))
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    /* register({ commit }, user) {
      console.log(user)
      return new Promise((resolve, reject) => {
        commit('auth_request')
        $http({ url: 'api/register', data: user, method: 'POST' })
          .then(resp => {
            const { token } = resp.data
            console.log(resp)
            // eslint-disable-next-line no-shadow
            const { user } = resp.data
            localStorage.setItem('token', token)
            // $http.defaults.headers.common.Authorization = token
            commit('auth_success', token, user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    }, */
    logout({ commit }) {
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        commit('logout')
        $http({ url: 'api/logout', method: 'POST' })
          .then(() => {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            this.state.auth.user = ''
            this.state.initialState.token = null
            this.state.initialState.status = false
            resolve()
          })
      })
    },
  },
  getters: {
    isLoggedIn: state => !!state.initialState.token,
    // authStatus: state => state.user,
  },
}
