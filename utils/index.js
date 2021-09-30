#!/usr/bin/env node
fs = require('fs');

let dict = {};
const listeDesGares = require("./referentiel-gares-voyageurs.json");

for(let key in listeDesGares) {
  dict[listeDesGares[key].fields.tvs]=listeDesGares[key].fields;
}
// test avec saint-leu
console.log(dict["SLF"])

const data = JSON.stringify(dict);
fs.writeFileSync('gares.json', data);
