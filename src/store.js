import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    myProducts: []
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = [...products]
    },
    BUY_PRODUCT(state, product) {
      state.myProducts.push(product)
    },
  },
  actions: {
    BUY_PRODUCT(context, product) {
      return new Promise((resolve) => {
        context.commit('BUY_PRODUCT', product)
        
        resolve(product)
      })
    }
  }
})
