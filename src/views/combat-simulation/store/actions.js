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
    
    console.log('Turn order: ', turnOrder);
    
    
    // Round cycle
    // for (let failSafe = 0; 
      // failSafe < 10
      //   && (state.armies.playerArmy.status !== 'defeated' 
      //   || state.armies.playerArmy.status !== 'defeated'); 
      // failSafe++) {      
      // Turn cycle
      for (let turn = 0; turn < turnOrder.length; turn++) {
        // Start of turn
        // console.log('Turn ', turn);
        
          // Determine the units that take action this turn
        let playerArmyActions = state.armies.playerArmy.unitBundles.filter(bundle => bundle.unit.properties.turnOrder.value === turnOrder[turn]);
        let enemyArmyActions = state.armies.enemyArmy.unitBundles.filter(bundle => bundle.unit.properties.turnOrder.value === turnOrder[turn]);
        // console.log('Player actions: ', playerArmyActions);
        // console.log('Enemy actions: ', enemyArmyActions);
        
        
          // Calculate damage
        let enemyDamageTaken = 0;
        playerArmyActions.forEach((action) => {
          enemyDamageTaken += action.attack;
        });
                
        let playerDamageTaken = 0;
        enemyArmyActions.forEach((action) => {
          playerDamageTaken += action.attack;
        });
        
        console.log(`Enemy damage: ${enemyDamageTaken}\nPlayer damage: ${playerDamageTaken}`);
        
        
        // End of turn
        
          // Apply damage
        for (let position = 0; enemyDamageTaken > 0 && position < state.armies.enemyArmy.unitBundles.length; position++) {
          let bundle = state.armies.enemyArmy.unitBundles[position];
          
          if (bundle.status !== 'dead') {
            bundle.health = bundle.health - enemyDamageTaken;
            
            if (bundle.health <= 0) {
              bundle.status = 'dead';
              bundle.amount = 0;
              enemyDamageTaken = Math.abs(bundle.health);
              bundle.health = 0;              
            } else {
              bundle.amount = Math.ceil(bundle.health / bundle.unit.properties.health.value);
            }
          }          
        }
        
        
        for (let position = 0; playerDamageTaken > 0 && position < state.armies.playerArmy.unitBundles.length; position++) {
          const bundle = state.armies.playerArmy.unitBundles[position];
          
          if (bundle.status !== 'dead') {
            bundle.health = bundle.health - playerDamageTaken;
            
            if (bundle.health <= 0) {
              bundle.status = 'dead';
              bundle.amount = 0;
              playerDamageTaken = Math.abs(bundle.health);
              bundle.health = 0;              
            } else {
              bundle.amount = Math.ceil(bundle.health / bundle.unit.properties.health.value);
            }
          }          
        }
        
        
        // Evaluate armies
        let defeated = true;
        state.armies.playerArmy.unitBundles.forEach((bundle) => {
          if (bundle.status !== 'dead') {
            defeated = false;
          }
        })
        if (defeated) { state.armies.playerArmy.status = 'defeated'; }
        
        defeated = true;
        state.armies.enemyArmy.unitBundles.forEach((bundle) => {
          if (bundle.status !== 'dead') {
            defeated = false;
          }
        })
        if (defeated) { state.armies.enemyArmy.status = 'defeated'; }
        
        
        console.log(state.armies);
        
      }
    // }
  }
}
