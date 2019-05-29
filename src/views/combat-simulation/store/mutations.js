import { merge } from 'lodash';

export default {
  unitAdd(state, payload) {
    if (!payload.unit) {
      console.error(`unitAdd: Unit cannot be ${payload.unit}`);
    } else {
      state.units.list.push(payload.unit);
    }
  },

  unitRemove(state, payload) {
    state.units.list.splice(payload.index, 1);
  },

  unitBundleAdd(state, payload) {
    payload.army.unitBundles.push(payload.bundle);
  },

  unitBundleUpdate(state, payload) {
    const bundle = payload.unitBundle;
    merge(bundle, payload.update);
    
    if (payload.update.unitType) {
      bundle.unit = state.units.list.find((unit) => {
        return unit.name === payload.update.unitType;
      });
    }

    console.log(bundle);
    
    if (!(bundle.unitType && parseInt(bundle.amount))) {
      bundle.health = null;
      bundle.attack = null;
      bundle.status = 'ignore';
    } else {
      bundle.health = bundle.unit.properties.health.value * bundle.amount;
      bundle.attack = bundle.unit.properties.attack.value * bundle.amount;
      bundle.status = 'active';
    };
  },

  unitBundleRemove(state, payload) {
    payload.army.unitBundles.splice(payload.unitBundleIndex);
  }
}
