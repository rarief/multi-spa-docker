<template>
  <div>
    <nav>
      <a href="/app-one/">App One</a>
      <a href="/app-two/">App Two</a>
      <a href="/app-three/">App Three</a>
    </nav>
    <div id="app">
      <h1>This is your homepage!</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
}
#app {
  padding: 20px;
}
nav {
  padding: 10px 15px;
  text-align: left;
  background-color: #ff7f50; 
}
nav > a {
  margin-right: 20px;
  color: #111;
  font-weight: 700;
  text-decoration: none;
}
nav > a:hover {
  text-decoration: underline;
}
h1 {
  margin: 0;
  font-size: 50px;
}
</style>
