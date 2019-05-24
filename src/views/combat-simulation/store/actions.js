import unitTemplate from '../../../mocked-data/combat-simulation/unit-template';

export default {
  addUnit(context, unit = null) {
    if (!unit) { unit = unitTemplate; }
    
    context.commit('addUnit', unit);
  },

  removeUnit(context, index = null) {
    if (!index) { 
      console.error('removeUnit: Index is required.');
    } else { 
      context.commit('removeUnit', index); 
    }
  } 
}
