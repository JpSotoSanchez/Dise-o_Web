var randomNumber1=Math.floor(Math.random() * 6) +1;
var randomNumber2=Math.floor(Math.random() * 6) +1;

var dado1=document.getElementById("dado1");
var dado2=document.getElementById("dado2");

dado1.setAttribute("src", `./images/dice${randomNumber1}.png`);
dado2.setAttribute("src", `./images/dice${randomNumber2}.png`);

var winner = "";
if (randomNumber1>randomNumber2){
    winner="The winner is P1";
} else if (randomNumber1==randomNumber2){
    winner="There is a Tie";
} else{
    winner="The winner is P2";
}
var title= document.getElementById("title");
title.innerHTML = winner;
console.log(winner);