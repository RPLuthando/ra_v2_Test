import $http from '../../libs/axios'

// const token = $cookies.get('XSRF-TOKEN')

export default {
  state: {
    // indvUser: [],
  },
  mutations: {
    /* users(state, users) {
      state.users = users
    }, */
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    createUser({ commit }, data) {
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        $http.post('api/register', data)
          .then(response => {
            console.log(response.data)
          })
          .catch(e => {
            this.errors.push(e)
          })
      })
    },
    // eslint-disable-next-line no-unused-vars
    updateUser({ commit }, user) {
      return new Promise((resolve, reject) => {
        $http({ url: `api/user/${user.id}`, data: user, method: 'PUT' })
          .then(resp => {
            console.log(resp.data)
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // eslint-disable-next-line no-unused-vars
    deleteUser({ commit }, userId) {
      console.log(userId)
      return new Promise((resolve, reject) => {
        $http({ url: `api/user/${userId}`, method: 'POST' })
          .then(resp => {
            console.log(resp.data)
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    /* getUser({ commit }, userId) {
      return new Promise((resolve, reject) => {
        console.log(userId)
        $http({
          url: `http://localhost:8000/api/user/${userId}`,
        })
          .then(resp => {
            console.log('user', resp.data[0])
            commit('indUser', resp.data[0])
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    }, */
  },
  getters: {},
}
