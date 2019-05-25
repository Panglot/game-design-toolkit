import unitTemplate from '../../../mocked-data/combat-simulation/unit-template';
import unitBundleTemplate from '../../../mocked-data/combat-simulation/unit-bundle-template';

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
  },

  addUnitBundle(context, armyKey, bundle = null) {
    if(!armyKey) { 
      console.error('addUnitBundle: ArmyKey must be provided') 
    } else {
      if(!bundle) { bundle = unitBundleTemplate }
      
      context.commit('addUnitBundle', armyKey, bundle)
    }
  }
}
