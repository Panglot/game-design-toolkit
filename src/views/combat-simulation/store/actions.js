import { merge } from 'lodash';

import unitTemplate from '../../../mocked-data/combat-simulation/unit-template';
import unitBundleTemplate from '../../../mocked-data/combat-simulation/unit-bundle-template';

export default {
  unitAdd({ commit }, payload = {}) {
    if (!payload.unit) { payload.unit = unitTemplate; }

    commit('unitAdd', payload);
  },

  unitRemove({ commit }, payload = {}) {
    if (!payload.index) {
      console.error('unitRemove: Index is required.');
    } else {
      commit('unitRemove', payload);
    }
  },

  unitBundleAdd({ commit }, payload = {}) {
    if (!payload.armyKey) { 
      console.error('unitBundleAdd: ArmyKey must be provided') ;
    } else {
      if (!payload.bundle) { payload.bundle = unitBundleTemplate }
      
      commit('unitBundleAdd', payload);
    }
  },

  unitBundleUpdate({ commit, dispatch, state }, payload = {}) {
    if (!(payload.armyKey && (payload.unitBundleIndex !== undefined))) { 
      console.error('unitBundleUpdate: Both armyKey and unitBundleIndex must be provided.');
    } else  {
      const bundle = JSON.parse(JSON.stringify(state.armies[payload.armyKey].unitBundles[payload.unitBundleIndex]));
      merge(bundle, payload.update);
      
      if (payload.update.unitType) {
        bundle.unit = state.units.list.find((unit) => {
          return unit.name === payload.update.unitType;
        });
      }

      if (!(bundle.unitType && parseInt(bundle.amount))) {
        bundle.health = null;
        bundle.attack = null;
        bundle.status = 'ignore';
      } else {
        bundle.health = bundle.unit.properties.health.value * bundle.amount;
        bundle.attack = bundle.unit.properties.attack.value * bundle.amount;
        bundle.status = 'active';
      }

      payload.update = bundle;
      commit('unitBundleSet', payload); 
      dispatch('armyReevaluate', { armyKey: payload.armyKey});
    }
  },

  unitBundleRemove({ commit }, payload = {}) {
    if (!(payload.armyKey && (payload.unitBundleIndex !== undefined))) { 
      console.error('unitBundleUpdate: Both armyKey and unitBundleIndex must be provided.');
    } else  {
      commit('unitBundleRemove', payload);
    }
  },

  armyReevaluate({ commit, state }, payload = {}) {
    if (!payload.armyKey) {
      console.error('armyReevaluate: ArmyKey is required.');
    } else {
      // Logic for update. attacOrder, status and etc.
    }
  }
}
