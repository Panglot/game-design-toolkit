export default {
  addUnit(state, payload) {
    if (!payload.unit) {
      console.error(`addUnit: Unit cannot be ${payload.unit}`)
    } else {
      state.units.list.push(payload.unit)
    }
  },

  removeUnit(state, payload) {
    state.units.list.splice(payload.index, 1)
  },

  addUnitBundle(state, payload) {
    console.log(payload)

    state.armies[payload.armyKey].unitBundles.push(payload.bundle)
  }
}
