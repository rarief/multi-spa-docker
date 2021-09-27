<template>
  <div id="app">
    <nav>
      <a href="/">&larr; Back</a>
    </nav>

    <h1>Welcome to App One</h1>
    <p>This is a Vue.js application</p>
    <img src="./assets/logo.png" />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  padding: 20px;
  font-family: Arial, sans-serif;
  font-size: 16px;
}
nav > * {
  margin-right: 20px;
  text-decoration: none;
}
</style>
