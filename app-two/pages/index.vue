<template>
  <div>
    <div class="back-button-container">
      <a href="/">&larr; Back</a>
    </div>
    <Tutorial/>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
body {
  margin: 0;
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