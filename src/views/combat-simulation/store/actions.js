import unitTemplate from '../../../mocked-data/combat-simulation/unit-template';
import unitBundleTemplate from '../../../mocked-data/combat-simulation/unit-bundle-template';

export default {
  addUnit({ commit }, payload = {}) {
    if (!payload.unit) { payload.unit = unitTemplate; }

    commit('addUnit', payload);
  },

  removeUnit({ commit }, payload = {}) {
    if (!payload.index) {
      console.error('removeUnit: Index is required.')
    } else {
      commit('removeUnit', payload)
    }
  },

  addUnitBundle({ commit }, payload = {}) {
    if(!payload.armyKey) { 
      console.error('addUnitBundle: ArmyKey must be provided') 
    } else {
      if(!payload.bundle) { payload.bundle = unitBundleTemplate }
      
      commit('addUnitBundle', payload)
    }
  }
}
