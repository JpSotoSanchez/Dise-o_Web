import sw from 'star-wars-quotes';
import { randomSuperhero } from 'superheroes';
import { randomSupervillain } from 'supervillains';
import { readFile } from 'fs'; 

console.log("Hello World!");

var superName1 = randomSuperhero();
var superName2 = randomSupervillain();
console.log(`${superName1} and ${superName2} will face each other tonight in the heart of Alpha City, in what promises to be the definitive battle between good and evil.`);

console.log(sw());

readFile("input.txt", "utf-8", (err, texto) => {
  if (err) throw err; 
  console.log(texto);
});

