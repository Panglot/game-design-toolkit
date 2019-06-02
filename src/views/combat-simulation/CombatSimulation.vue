<template>
  <div class="simulation">
    <h1>Simulation</h1>
    <!-- Units -->
    <div class="units">
      <div v-for="(unit, unitIndex) in units.list" :key="unitIndex" class="unit">
        <h3>
          <input 
            type="text"
            :value="unit.name"
            @input="unitUpdate({
              unit,
              update: { name: $event.target.value }
          })">
        </h3>
        <div class="properties">
          <div v-for="(property, propertyIndex) in unit.properties" :key="propertyIndex" class="property">
            <span>{{ property.name }}</span>
            <input 
              type="number" 
              :value="property.value"
              @input="unitUpdate({
                unit,
                update: { 
                  properties: { 
                    [propertyIndex]: { value: $event.target.value }
                  }
                }
            })">
          </div>
        </div>
        <button @click="unitRemove({ unitIndex })">x</button>
      </div>
      <button @click="unitAdd()">Add unit +</button>
      <hr>
    </div>

    <button @click="generateRandomUnitSets()">Generate Units</button>

    <!-- Armies -->
    <div class="armies">
      <div v-for="(army, armyKey) in armies" :key="armyKey" class="army">
        <h3>{{ armyKey }}</h3>

        <div v-for="(unitBundle, unitBundleIndex) in army.unitBundles" :key="unitBundleIndex">
          <select
            @change="unitBundleUpdate({
                unitBundle,
                update: { unitType: $event.target.value }
            })">
            <option value></option>
            <option v-for="(unit, index) in units.list" :key="index" :value="unit.name">{{ unit.name }}</option>
          </select>
          <input 
            type="number"
            min="0"
            placeholder="amount" 
            @input="unitBundleUpdate({ 
              unitBundle,
              update: { amount: $event.target.value }
          })">
          <button @click="unitBundleRemove({ army, unitBundleIndex })">x</button>
          <button @click="unitBundleUpdate({ unitBundle })">⟳</button>
        </div>
        <button @click="unitBundleAdd({ army })">Add +</button>

        <!-- ArmyData  -->
        <div class="armyData">
          <div v-for="(unitBundle, index) in army.unitBundles" :key="index"> 
            <h4 style="margin-bottom: .5rem; font-size: 1.4rem;">{{unitBundle.amount}} {{ unitBundle.unitType }}s</h4>
            <span v-if="unitBundle.health"><strong>HP:</strong>{{ unitBundle.health }}&nbsp;&nbsp;</span>
            <span v-if="unitBundle.attack"><strong>Attack: </strong> {{ unitBundle.attack }}</span>
          </div>
        </div>
      </div>
      <hr>
    </div>

    <!-- Other -->
    <button @click="generateCombat()">Generate</button>

    <div v-for="(combat, index) in combats.list" :key="index">
      <h4>Combat {{ index }}</h4>
      <p v-for="(line, lineIndex) in combat.log" :key="lineIndex">{{ line }}</p>
    </div>
  </div>
</template>

<script>
// store imports
import combatSimulationModule from './store/index';
import { mapActions, mapGetters } from 'vuex';

// other imports
import unitsSaved from '../../mocked-data/units';
import { random } from 'lodash';

export default {
  name: 'combatSimulation',
  components: {},
  data() {
    return {
      CONSTANTS: {
        STARTING_BUNDLES_COUNT: 2
      }
    };
  },
  // Init the store with default data if not set
  created() {
    const store = this.$store;

    if (!(store && store.state && store.state['combatSimulation'])) {
      store.registerModule('combatSimulation', combatSimulationModule);
      this.initStoreData();
    } 
  },
  computed: {
    ...mapGetters([ 
      'units',
      'armies',
      'combats'
     ]),
  },
  methods: {
    ...mapActions([
      'unitAdd',
      'unitRemove',
      'unitUpdate',
      'unitBundleAdd',
      'unitBundleRemove',
      'unitBundleUpdate',
      'generateCombat'
    ]),
    
    initStoreData() {
      unitsSaved.forEach((unit) => { this.unitAdd({ unit }) });
      this.generateRandomUnitSets();      
    },

    generateRandomUnitSets() {
      Object.keys(this.armies).forEach((armyKey) => {
        this.armies[armyKey].unitBundles = [];

        for (let i = 0; i < this.CONSTANTS.STARTING_BUNDLES_COUNT; i++) {
          const randomUnit = this.units.list[random(0, this.units.list.length - 1)];
          const amount = random(1, 100);
          this.unitBundleAdd({ 
            army: this.armies[armyKey],  
            bundle: {
              status: 'active',
              unitType: randomUnit.name, 
              amount: amount,
              unit: randomUnit,
              health: randomUnit.properties.health.value * amount,
              attack: randomUnit.properties.attack.value * amount
            }
          }); 
        }
      })
    }
    // generateSimulation() {
    //   let combat = {
    //     status: 'impossible',
    //     army1: { attackOrder: [] },
    //     army2: { attackOrder: [] }
    //   };
    //   let armyStatus = [
    //     { hasHealth: false, hasAttack: false },
    //     { hasHealth: false, hasAttack: false }
    //   ];

    //   this.armies[0].forEach(unitBundle => {
    //     if (!armyStatus[0].hasHealth)
    //       armyStatus[0].hasHealth = unitBundle.totalHP ? true : false;
    //     if (!armyStatus[0].hasAttack)
    //       armyStatus[0].hasAttack = unitBundle.totalAttack ? true : false;

    //     if (unitBundle.unit)
    //       combat.army2.attackOrder.push(
    //         unitBundle.unit.properties.attackOrder.value
    //       );
    //   });
    //   this.armies[1].forEach(unitBundle => {
    //     if (!armyStatus[1].hasHealth)
    //       armyStatus[1].hasHealth = unitBundle.totalHP ? true : false;
    //     if (!armyStatus[1].hasAttack)
    //       armyStatus[1].hasAttack = unitBundle.totalAttack ? true : false;

    //     if (unitBundle.unit)
    //       combat.army2.attackOrder.push(
    //         unitBundle.unit.properties.attackOrder.value
    //       );
    //   });

    //   combat.army1.attackOrder.sort();
    //   combat.army2.attackOrder.sort();

    //   this.combats.push(combat);
    // }
  }
};
</script>

<style lang="scss">
.simulation {
  text-align: center;

  h1,
  h2,
  h3 {
    text-align: center;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  }
  h1 {
    font-size: 2.4rem;
  }
  h3 {
    font-size: 1.5rem;
  }

  input {
    text-align: left;
    font-family: inherit;
    font-size: inherit;
    border: none;
    border-bottom: 1px solid black;
    background-color: inherit;
    margin: 0 1rem;
    width: auto;

    &:focus {
      outline: none;
    }
  }

  .unit {
    display: inline-block;
    border: 1px solid black;
    border-radius: 0.5rem;
    background-color: aliceblue;
    padding: 1rem;
    margin: 1rem;
    max-width: 30rem;

    -webkit-box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
      0 3px 6px rgba(0, 0, 0, 0.23);
    -moz-box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
      0 3px 6px rgba(0, 0, 0, 0.23);
    -ms-box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    -o-box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

    &:hover {
      background-color: azure;

      -webkit-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
        0 6px 6px rgba(0, 0, 0, 0.23);
      -moz-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
        0 6px 6px rgba(0, 0, 0, 0.23);
      -ms-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
        0 6px 6px rgba(0, 0, 0, 0.23);
      -o-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
        0 6px 6px rgba(0, 0, 0, 0.23);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    }

    input {
      min-width: 2rem;
      max-width: 4rem;
    }

    h3 input {
      max-width: 10rem;
      text-align: center;
    }

    .properties {
      display: flex;
      flex-wrap: wrap;

      .property {
        margin-bottom: 0.5rem;
        flex-grow: 1;
        font-weight: bold;
        display: flex;
        width: 50%;
      }
    }
  }
}
</style>
