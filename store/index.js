import { Store } from 'vuex'
import client from './client'
import adminGlobal from './admin/global'

export default () =>
  new Store({
    namespaced: true,
    strict: true,
    state: () => ({}),
    actions: {},
    mutations: {},
    modules: {
      client,
      adminGlobal,
    },
  })
