<template>
  <div id="episodeTableView">
    <table class="table table-hover table-dark">
      <thead>
        <tr>
          <th scope="col">EncounterID</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="episode in episodes" :key="episode.EpisodeId">
          <td>{{ episode.EpisodeId }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Episode } from "../models/FOTO/Episode";

export default defineComponent({
  name: 'EpisodeList',
  props: {
    episodes: Array as PropType<Array<Episode>>,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
