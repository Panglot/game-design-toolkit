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
    state.armies[payload.armyKey].unitBundles.push(payload.bundle);
  },

  unitBundleSet(state, payload) {
    state.armies[payload.armyKey].unitBundles.splice(payload.unitBundleIndex, 1, payload.update);
  },

  unitBundleRemove(state, payload) {
    state.armies[payload.armyKey].unitBundles.splice(payload.unitBundleIndex);
  }
}
