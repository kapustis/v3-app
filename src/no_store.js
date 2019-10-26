import Vue from 'vue'
import Vuex from 'vuex'
import  auth from './store/modules/auth.store'
import product from './store/modules/product'
import config from './store/modules/config.store'
import  shared from './store/modules/shared'
import  info from './store/modules/info'
import  orders from './store/modules/orders.store'
import  shoppingCart from './store/modules/shoppingCart'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    product,
    config,
    shared,
    info,
    shoppingCart,
    orders
  },
  state: {
    drawer: false,
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer)
  },
  actions: {

  }
})
