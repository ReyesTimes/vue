import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import formatMoney from '@/filter/format-money';

import '@/sass/index.scss';

Vue.use(formatMoney);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');