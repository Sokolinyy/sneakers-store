<template>
  <router-view />
  <Header />
</template>

<script lang="ts" setup>
import Header from "./components/Header.vue";
</script>

<style lang="scss">
body {
  margin-top: 85px;
  background-color: rgb(243, 243, 243);
}

#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
