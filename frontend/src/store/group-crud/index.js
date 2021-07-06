import $http from '../../libs/axios'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    createGroup({ commit }, data) {
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        $http({ url: 'api/create_group', data, method: 'POST' })
          .then(response => {
            console.log(response.data)
            resolve(response)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // eslint-disable-next-line no-unused-vars
    updateGroup({ commit }, group) {
      return new Promise((resolve, reject) => {
        $http({ url: `api/update_group/${group.id}`, data: group, method: 'PUT' })
          .then(response => {
            console.log(response.data)
            resolve(response)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // eslint-disable-next-line no-unused-vars
    deleteGroup({ commit }, groupId) {
      console.log(groupId)
      return new Promise((resolve, reject) => {
        $http({ url: `api/delete_group/${groupId}`, method: 'POST' })
          .then(response => {
            console.log(response.data)
            resolve(response)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
  },
  getters: {},
}
