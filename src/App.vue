<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/combat-simulation">Combat Simulation</router-link>
    </nav>
    <h3 style="text-align:center">
      Туй е дефолтната страница на Vue Js. ↑ В менюто над текста е симулатора.
    </h3>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Calibri Body  ", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body {
  background-color: beige;
}
nav {
  padding: 30px;
  text-align: center;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #773b88;
    }
  }
}
</style>
