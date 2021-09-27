<template>
  <div id="app">
    <nav>
      <a href="/app-one/">App One</a>
      <a href="/app-two/">App Two</a>
      <a href="/app-three/">App Three</a>
    </nav>

    <h1>Root</h1>
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
