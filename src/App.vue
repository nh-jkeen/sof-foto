<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Test!"/>
</template>

<script>

import SmartClient from './smartClient'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  async mounted(){
    const smart = await SmartClient();
    console.log(smart);
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
