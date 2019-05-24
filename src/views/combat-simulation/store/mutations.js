export default {
  addUnit(state, unit) {
    if (!unit) { 
      console.error(`addUnit: Unit cannot be ${unit}`); 
    } else {
      state.units.list.push(unit);
    }
  },
  removeUnit(state, index) {
    state.units.list.splice(index, 1);
  }
}
