import Vue from 'vue';
import App from './App.vue';
import store from './store/store.js'
import router from './router';
import { sync } from 'vuex-router-sync';

sync(store, router)
Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
