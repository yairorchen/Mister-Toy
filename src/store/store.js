import { toyModule } from '../store/toy.store.js'

// const { createStore } = Vuex
import { createStore } from 'vuex'
const storeOptions = {
  strict: true,
  state() {
    return {}
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    toyModule,
  },
}

export const store = createStore(storeOptions)
