import Vue from 'vue';
import Vuex from 'vuex';
import CombatSimulation from '../views/combat-simulation/store/index.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { CombatSimulation },
  state: {},
  mutations: {},
  actions: {}
})
