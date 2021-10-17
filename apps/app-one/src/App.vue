<template>
  <div>
    <div class="back-button-container">
      <a href="/">&larr; Back</a>
    </div>
    <div id="app">
      <img alt="Vue logo" src="./assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.back-button-container {
  padding: 10px 15px;
  text-align: left;
  background-color: #ff7f50; 
}
.back-button-container a {
  text-decoration: none;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 700;
  color: #111;
}
.back-button-container a:hover {
  text-decoration: underline;
}
</style>
