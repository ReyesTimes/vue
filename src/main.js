import Vue from 'vue'
import App from './App.vue'
import store from './store'

import formatMoney from '@/filter/format-money'

Vue.use(formatMoney)

Vue.config.productionTip = false

import '@/sass/index.scss'
import router from './router'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
