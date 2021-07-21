<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Test!"/>
</template>

<script>

import 'fhirclient/build/fhir-client'
import smartClient  from './smartClient'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  async mounted(){
    const smart = await smartClient ();
    console.log(smart);

    const pat = await smart.patient.read();
    console.log(pat);

    const prc = await smart.user.read();
    console.log(prc);
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
