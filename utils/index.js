#!/usr/bin/env node
const fs = require('fs');

let dict = {};
let listeDesGares = [];
const dataset = require("./referentiel-gares-voyageurs.json");

for(let key in dataset) {
  if (/[A-Z]{3}/.test(dataset[key].fields.tvs)){
    // console.log(dataset[key].fields.gare_alias_libelle_noncontraint)
    if(dataset[key].fields.gare_alias_libelle_noncontraint === "Paris Montparnasse") {
    	console.log(dataset[key])
    }
	  dict[dataset[key].fields.alias_libelle_noncontraint]=dataset[key].fields;
    listeDesGares.push(dataset[key].fields.alias_libelle_noncontraint);
  }
}
// test avec saint-leu
console.log(dict["Saint-Leu-la-Forêt"])

const data = JSON.stringify(dict);
fs.writeFileSync('gares.json', data);
fs.writeFileSync('liste.json', JSON.stringify(listeDesGares));
