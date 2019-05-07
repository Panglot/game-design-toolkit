<template>
  <div class="simulation">
    <h1>Simulation</h1>
    <div v-for="(unit, index) in units" :key="index" class="unit">
      <h3><input type="text" v-model="unit.name" /></h3>
      <div class="properties">
        <div
          v-for="(property, index) in unit.properties"
          :key="index"
          class="property"
        >
          <span>{{ property.name }}</span>
          <input type="number" v-model="property.content" />
        </div>
      </div>
    </div>
    <hr />
    <div>
      <h2>Test</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "combatSimulation",
  components: {},
  data() {
    return {
      units: [
        {
          name: "Mage",
          properties: {
            attack: {
              name: "Attack",
              content: 10
            },
            health: {
              name: "HP",
              content: 5
            },
            specialLevel: {
              name: "Special",
              content: 0
            }
          }
        },
        {
          name: "Monk",
          properties: {
            attack: {
              name: "Attack",
              content: 5
            },
            health: {
              name: "HP",
              content: 20
            },
            physicalDefense: {
              name: "Armor",
              content: 0
            },
            magicalDefense: {
              name: "Magic Resist",
              content: 0
            }
          }
        }
      ]
    };
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
    font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  }
  h1 {
    font-size: 2.4rem;
  }
  h3 {
    font-size: 1.5rem;
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
      text-align: left;
      font-family: inherit;
      font-size: inherit;
      border: none;
      border-bottom: 1px solid black;
      background-color: inherit;
      margin: 0 1rem;
      width: auto;
      min-width: 2rem;
      max-width: 4rem;

      &:focus {
        outline: none;
      }
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
