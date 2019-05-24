import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/combat-simulation',
      name: 'combat-simulation',
      component: () =>
        import('./views/combat-simulation/CombatSimulation.vue')
    },
    {
      path: '/vue-info-page',
      name: 'vue-info-page',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './views/VueInfo.vue')
    }
  ]
});
