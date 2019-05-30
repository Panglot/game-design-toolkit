import { merge, cloneDeep } from 'lodash';

import unitTemplate from '../../../mocked-data/combat-simulation/unit-template';
import unitBundleTemplate from '../../../mocked-data/combat-simulation/unit-bundle-template';

export default {
  unitAdd({ commit }, payload = {}) {
    if (!payload.unit) { payload.unit = unitTemplate; }

    commit('unitAdd', payload);
  },
  unitRemove({ commit }, payload) {
    if (!payload.unitIndex) {
      console.error('unitRemove: unitIndex is required.');
    } else {
      commit('unitRemove', payload);
    }
  },
  unitUpdate({ commit }, payload) {
    if (!payload.unit) {
      console.error('unitUpdate: unit must be provided.');
    } else {
      commit('unitUpdate', payload)
    }    
  },

  unitBundleAdd({ commit }, payload) {
    if (!payload.army) { 
      console.error('unitBundleAdd: ArmyKey must be provided') ;
    } else {
      if (!payload.bundle) { payload.bundle = cloneDeep(unitBundleTemplate) }
      
      commit('unitBundleAdd', payload);
    }
  },
  unitBundleRemove({ commit }, payload) {
    if (!(payload.army && (payload.unitBundleIndex !== undefined))) { 
      console.error('unitBundleUpdate: Both army and unitBundleIndex must be provided.');
    } else  {
      commit('unitBundleRemove', payload);
    }
  },
  unitBundleUpdate({ commit, dispatch, state }, payload) {
    if (!payload.unitBundle) { 
      console.error('unitBundleUpdate: unitBundle must be provided.');
    } else  {
      commit('unitBundleUpdate', payload); 
    }
  },

  armyReevaluate({ commit, state }, payload) {
    if (!payload.armyKey) {
      console.error('armyReevaluate: army is required.');
    } else {
      // Logic for update. attacOrder, status and etc.
    }
  }
}
