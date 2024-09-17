// Variables globales
const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];

// Función nextSequence
function nextSequence() {
    // Genera un número aleatorio entre 0 y 3
    const randomNumber = Math.floor(Math.random() * 4);
    
    // Almacena el color correspondiente al número generado
    const randomChosenColor = buttonColors[randomNumber];
    
    // Inserta el color en el patrón del juego
    gamePattern.push(randomChosenColor);

    // Verificar en la consola
    console.log(gamePattern);

    // Selecciona el botón usando jQuery y añade un efecto de parpadeo
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
}

$("#" + randomChosenColor).fadeOut(100).fadeIn(100);
