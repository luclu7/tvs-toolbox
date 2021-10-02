<template>
  <div>
    <!--<label style="font-size: 2em;">Code de la gare (3 lettres): <input autofocus style="width:2em;font-size:1.5em;" maxlength="3" v-model="codeGare" type="text"></label>
    -->
    <b-field label="Gare">
      <b-autocomplete
          v-model="nomGare"
          icon="train"
          placeholder="Rochefort"
          :keep-first="true"
          :open-on-focus="true"
          :data="filteredDataObj"
          field="ville"
          @select="option => selectedStation = option">
      </b-autocomplete>
    </b-field>
    <p style="font-size: 2em;">{{ explainCode }}</p>

    <div style="height: 55vh; margin-top: 20vh;">

      <LMap :zoom="zoom" :center="center">
        <LMarker :lat-lng="center"></LMarker>
        <LTileLayer :url="url" :attribution="attribution"></LTileLayer>
      </LMap>
    </div>
  </div>
</template>

<script>
const listeDesGares = require("../../utils/gares.json");
const listeNomDesGares = require("../../utils/liste.json");
import { LMap, LMarker, LTileLayer } from 'vue2-leaflet';

export default {
  name: 'encoder',
  components: {
    LMap,
    LMarker,
    LTileLayer
  },
  computed: {
    explainCode: function () {
      if (listeDesGares[this.nomGare]) {
        return `Le code de ${listeDesGares[this.nomGare].alias_libelle_noncontraint}, ${listeDesGares[this.nomGare].departement_libellemin} (${listeDesGares[this.nomGare].departement_numero}) est ${listeDesGares[this.nomGare].tvs}`;
      } else {
        return "🤷‍♀️";
      }
    },
    filteredDataObj() {
      return this.listeNomDesGares.filter((option) => {
        return option
            .toString()
            .toLowerCase()
            .indexOf(this.nomGare.toLowerCase()) >= 0
      })
    }
  },
  data() {
    let codeGare = "";
    let nomGare = "";
    return {
      codeGare,
      nomGare,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 16,
      center: [48.853281, 2.349165],
      bounds: null,
      attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      listeNomDesGares
    }
  },
  watch: {
    nomGare: function () {
      if (listeDesGares[this.nomGare]) {
        this.center = listeDesGares[this.nomGare].wgs_84;
      }
    }
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
  margin-top: 10px;
}
</style>