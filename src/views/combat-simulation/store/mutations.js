import { merge } from 'lodash';
import Vue from 'vue';

export default {
  unitAdd(state, payload) {
    if (!payload.unit) {
      console.error(`unitAdd: Unit cannot be ${payload.unit}`);
    } else {
      state.units.list.push(payload.unit);
    }
  },
  unitRemove(state, payload) {
    state.units.list.splice(payload.unitIndex, 1);
  },
  unitUpdate(state, payload) {
    const unit = payload.unit;
    merge(unit, payload.update);
  },

  unitBundleAdd(state, payload) {
    payload.army.unitBundles.push(payload.bundle);
    
    if(payload.bundle.unitType && payload.bundle.amount) {
      payload.army.status = 'active';
    } else {
      payload.army.status = 'inactive';
    }
  },
  unitBundleRemove(state, payload) {
    const bundles = payload.army.unitBundles;
    
    bundles.splice(payload.unitBundleIndex);
    
    if (!bundles.length) {
      payload.army.status = 'inactive';
    }
  },
  unitBundleUpdate(state, payload) {
    const bundle = payload.unitBundle;
    
    if (payload.update) {
      merge(bundle, payload.update);
      
      if (payload.update.unitType) {
        bundle.unit = state.units.list.find((unit) => {
          return unit.name === payload.update.unitType;
        });
      }
    }
    
    if (!(bundle.unitType && parseInt(bundle.amount))) {
      bundle.health = null;
      bundle.attack = null;
      bundle.status = 'inactive';
      state.armies[payload.armyKey].status = 'inactive';
    } else {
      Vue.set(bundle, 'health', bundle.unit.properties.health.value * bundle.amount);
      Vue.set(bundle, 'attack', bundle.unit.properties.attack.value * bundle.amount);
      bundle.status = 'active';
      state.armies[payload.armyKey].status = 'active';
    };
  },

  combatAdd(state, payload) {
    state.combats.list.push(payload.combat);
  },
  combatsClear(state) {
    state.combats.list = [];
  }
}
