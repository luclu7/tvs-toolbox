<template>
  <div>
    <label style="font-size: 2em;">Code de la gare (3 lettres): <input autofocus style="width:2.2em;font-size:1.5em;" maxlength="3" v-model="codeGare" type="text"></label>
    <p style="font-size: 2em;">{{ explainCode }}</p>
    <div id="osm-map"></div>
    <div style="height: 63vh; margin-top: 15vh;">

      <LMap :zoom="zoom" :center="center">
        <LMarker v-text="truc" :lat-lng="center"></LMarker>
        <LTileLayer :url="url" :attribution="attribution"></LTileLayer>
      </LMap>
    </div>
  </div>
</template>

<script>
const listeDesGares = require("../../utils/gares-decoder.json");
import { LMap, LMarker, LTileLayer } from 'vue2-leaflet';

export default {
  name: 'Encoder',
  components: {
    LMap,
    LMarker,
    LTileLayer
  },
  computed: {
    explainCode: function () {
      if (this.codeGare.length === 3) {
        if (listeDesGares[this.codeGare]) {
          console.log(listeDesGares[this.codeGare])
          return `Ce code correspond à la gare de ${listeDesGares[this.codeGare].alias_libelle_noncontraint}, ${listeDesGares[this.codeGare].departement_libellemin} (${listeDesGares[this.codeGare].departement_numero})`;
        } else {
          return "🤷‍♀️";
        }
      } else {
        return "🤷‍♀️";
      }
    }
  },
  data() {
    let codeGare = "";
    return {
      codeGare,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 16,
      center: [48.853281, 2.349165],
      bounds: null,
      attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }
  },
  watch: {
    codeGare: function () {
      this.codeGare = this.codeGare.toUpperCase();

      if (this.codeGare.length === 3) {
        if (listeDesGares[this.codeGare]) {
          console.log(listeDesGares[this.codeGare].wgs_84)
          this.center = listeDesGares[this.codeGare].wgs_84;
        }
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
}
</style>
