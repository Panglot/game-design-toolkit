<template>
  <div class="simulation">
    <h1>Simulation</h1>
    <!-- Units -->
    <div class="units">
      <div v-for="(unit, index) in units.list" :key="index" class="unit">
        <h3>
          <input type="text" v-model="unit.name">
        </h3>
        <div class="properties">
          <div v-for="(property, index) in unit.properties" :key="index" class="property">
            <span>{{ property.name }}</span>
            <input type="number" v-model="property.value">
          </div>
        </div>
        <button @click="removeUnit(index)">x</button>
      </div>
      <button @click="addUnit()">Add unit +</button>
      <hr>
    </div>

    <!-- Armies -->
    <div class="armies">
      <div v-for="(army, armyIndex) in armiesOld" :key="armyIndex" class="army">
        <h3>Army {{ armyIndex+1 }}</h3>

        <div v-for="(unitBundle, unitBundleIndex) in army" :key="unitBundleIndex">
          <select v-model="unitBundle.unitType">
            <option value></option>
            <option v-for="(unit, index) in units.list" :key="index" :value="unit.name">{{ unit.name }}</option>
          </select>
          <input type="number" placeholder="amount" v-model="unitBundle.amount">
          <button @click="removeUnitBundle(armyIndex, unitBundleIndex)">x</button>
        </div>

        <!-- <button @click="addUnitBundle(armyIndex)">Add +</button> -->

        <div class="armyData">
          <div v-for="(unitBundle, index) in army" :key="index">
            <h4>{{ unitBundle.unitType }}</h4>
            <span v-if="unitBundle.totalHP">HP: {{ unitBundle.totalHP }}</span>
            <span v-if="unitBundle.totalAttack">Attack: {{ unitBundle.totalAttack }}</span>
          </div>
        </div>
      </div>
      <hr>
    </div>

    <!-- Other -->
    <button @click="generateSimulation()">Generate</button>

    <div>{{ combats }}</div>
    <button @click="addUnit()"> Е ТУК Е ТЪЙ</button>
  </div>
</template>

<script>
// store imports
import combatSimulationModule from './store/index';
import { mapActions, mapGetters } from 'vuex';

// other imports
import unitsSaved from '../../mocked-data/units';

export default {
  name: 'combatSimulation',
  components: {},
  data() {
    return {
      CONSTANTS: {
        STARTING_BUNDLES: 2
      },
      armies$: [
        [{ unitType: '', amount: '' }, { unitType: '', amount: '' }],
        [{ unitType: '', amount: '' }, { unitType: '', amount: '' }]
      ],
      combats: []
    };
  },
  // Init the store module
  created() {
    const store = this.$store;

    if (!(store && store.state && store.state['combatSimulation'])) {
      this.$store.registerModule('combatSimulation', combatSimulationModule);
      // this.initStoreData();
    } 
  },
  computed: {
    ...mapGetters([ 
      'units',
      'armies'
     ]),

    armiesOld: {
      get() {
        this.armies$.forEach(army => {
          army.map(unitsBundle => {
            let outputBundle = unitsBundle;
            outputBundle.unit = this.units.list.find(
              unit => unit.name === unitsBundle.unitType
            );

            if (outputBundle.unit) {
              outputBundle.totalHP =
                outputBundle.unit.properties.health.value * outputBundle.amount;

              outputBundle.totalAttack =
                outputBundle.unit.properties.attack.value * outputBundle.amount;
            } else {
              outputBundle.totalHP = 0;
              outputBundle.totalAttack = 0;
            }
            return outputBundle;
          });
        });

        return this.armies$;
      }
    }
  },
  methods: {
    ...mapActions([
      'addUnit',
      'removeUnit',
      'addUnitBundle'
    ]),
    
    initStoreData() {
      unitsSaved.forEach((unit) => { this.addUnit(unit) });

      Object.keys(this.armies).forEach((army) => {
        for (let i = 0; i < this.CONSTANTS.STARTING_BUNDLES; i++) { this.addUnitBundle(army); }
      })
    },
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
    // },
    // addUnitBundle(index) {
    //   this.armies[index].push({ unitType: '', amount: '' });
    // },
    removeUnitBundle(armyIndex, unitBundleIndex) {
      this.armies[armyIndex].splice(unitBundleIndex, 1);
    }
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
