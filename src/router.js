import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import MyProducts from './views/MyProducts.vue';

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/mis-productos',
      name: 'myProducts',
      component: MyProducts,
    },
    {
      path: '*',
      name: 'default',
      component: Home,
    },
  ],
});