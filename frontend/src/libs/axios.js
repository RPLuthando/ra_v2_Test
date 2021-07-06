import Vue from 'vue'
import axios from 'axios'

// const token = $cookies.get('XSRF-TOKEN')
const token = localStorage.getItem('token-plain')

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: 'http://localhost:8000/',
  timeout: 10000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${token}`,
  },
})
axiosIns.defaults.withCredentials = true

Vue.prototype.$http = axiosIns

export default axiosIns
