const buttonColors = ["red", "blue", "green", "yellow"];
let patterns = [];



function nextSequence(){
    const guardar= Math.floor(Math.random() * 4);
    patterns.push(guardar);
    return guardar;
}

console.log(nextSequence())
console.log(patterns)


