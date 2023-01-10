// import axios from 'axios'
// import store from '../store'

// const api = axios.create({
//   baseURL: 'http://3.0.99.90:8085/api/v1/',
//   timeout: 5000,
// })

// console.log(store.state.userToken.token)

// api.interceptors.request.use((config) => {
//   config.headers = {
//     Authorization: 'Bearer ' + store.state.userToken.token,
//   }
//   return config
// })

// api.interceptors.response.use((result) => {
//   return result
// })

// export default api
// const axios = require('axios').default

// export default function ({ store }, inject) {
//   const axiosConfig = { timeout: 30000 }
//   axiosConfig.baseURL = 'http://3.0.99.90:8085/api/v1/'

//   const api = axios.create(axiosConfig)

//   api.onRequest((config) => {
//     try {
//       const authToken = store.state.admin.global.token

//       if (authToken) {
//         config.headers.Authorization = `Bearer ${authToken}`
//       }
//     } catch {}

//     return config
//   })

//   inject('api', api)
// }
