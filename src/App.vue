<template>
  <div id="app">
    <BloomDemo msg="Bloom Filter Demo"/>
  </div>
</template>

<script>
import BloomDemo from './components/BloomDemo.vue'

export default {
  name: 'App',
  components: {
    BloomDemo
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
