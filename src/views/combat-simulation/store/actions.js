import { uniq, sortedUniq, cloneDeep, concat } from 'lodash';

import unitTemplate from '../../../mocked-data/combat-simulation/unit-template';
import unitBundleTemplate from '../../../mocked-data/combat-simulation/unit-bundle-template';

export default {
  unitAdd({ commit }, payload = {}) {
    if (!payload.unit) { payload.unit = cloneDeep(unitTemplate); }

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
  },

  generateCombat({commit, state }, payload) {
    // 1. Create the combat turn order
    let turnOrder = uniq(
      concat(state.armies.playerArmy.unitBundles, state.armies.enemyArmy.unitBundles)
      .map((bundle) => { return parseInt(bundle.unit.properties.turnOrder.value); })
      .sort((a, b) => { return a - b; })
    )
    
    // while ((state.armies.playerArmy.status !== 'defeated') && (state.armies.enemyArmy.status !== 'defeated')) {
    //   console.log('.');
      
    // }
    
    
    // // 1. Create unified turn order
    // let turnOrder = [];
    
    // Object.keys(state.armies).forEach(armyKey => {
    //   state.armies[armyKey].unitBundles.forEach(bundle => {
    //     if (bundle.unit && bundle.amount){
    //       let unitTurnOrder = bundle.unit.properties.turnOrder.value;
    //       turnOrder.push(unitTurnOrder);
    //     }
    //   })
       
    // });

    // turnOrder = uniq(turnOrder);
    // turnOrder.sort();

    // // 2. Combat create
    // let combat = {
    //   log: [],
    //   rounds: [{
    //       turns: [{
    //           armies: cloneDeep(state.armies),
    //           actions: []
    //         }
    //       ]
    //     }
    //   ]
    // }
    
    // // 3. Combat simulate

    // // Round cycle
    // let currentRound = combat.rounds[0]

    // // Turn cycle
    // for (let turnIndex = 0; turnIndex < turnOrder.length; turnIndex++) {
    //   combat.log.push(`Тurn ${turnIndex+1}:`);

    //   // Generate Actions:
    //   // each bundle of each army is checked if it is its turn to make action 
    //   let currentTurn = currentRound.turns[turnIndex];

    //   Object.keys(currentTurn.armies).forEach((armyKey) => {
        
    //     currentTurn.armies[armyKey].unitBundles.forEach((bundle, bundleIndex) => {
    //       if (bundle.unit.properties.turnOrder.value === turnOrder[turnIndex]) {
    //         combat.log.push(` ${armyKey}'s ${bundle.amount} ${bundle.unitType}s in position ${bundleIndex} attacks with ${bundle.attack} attack`);

    //         const action = {
    //           attack: {
    //             target: 'front',
    //             value: bundle.attack,
    //             source: {
    //               army: armyKey,
    //               unit: bundle.unitType,
    //               position: bundleIndex,
    //               amount: bundle.amount
    //             }
    //           }
    //         }

    //         currentTurn.actions.push(action);
    //       }
    //     })
    //   })

    //   // Execute actions 
    //   currentTurn.actions.forEach((action, index) => {
    //     console.log(action);
        
    //   })

    //   // Add new turn
    //   currentRound.turns.push({
    //     armies: cloneDeep(state.armies),
    //     actions: []
    //   })
      
    // }
    // console.log(`! Combat Log !\n ${combat.log.join('\n ')}`);
    // // console.log(combat.rounds);
    
    
    // commit('combatsClear');
    // commit('combatAdd', { combat });
  }
}
