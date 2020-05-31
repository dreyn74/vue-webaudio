<template>
  <div id="app">
    <img width="25%" src="./assets/logo.png">
    <Engine msg="Hello Vue in CodeSandbox!"/>
  </div>
</template>

<script>
import Engine from "./components/Engine";

export default {
  name: "App",
  components: {
    Engine
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
