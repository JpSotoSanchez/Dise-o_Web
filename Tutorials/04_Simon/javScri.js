// Array que contiene los colores de los botones disponibles en el juego.
var buttonColors = ["red", "blue", "green", "yellow"];

// Array que almacena la secuencia de colores que el juego genera.
var gamePattern = [];

// Array que almacena la secuencia de colores que el usuario ha clicado.
var userClickedPattern = [];

// Variable que indica si el juego ha comenzado. Inicialmente está en falso.
var started = false;

// Variable que mantiene el nivel actual del juego. Comienza en 0.
var level = 0;

// Función que se ejecuta cuando se presiona una tecla en el teclado.
$(document).keydown(function() {
    // Verifica si el juego no ha comenzado aún (started es falso).
    if (!started) {
        // Cambia el texto del título en la página para mostrar el nivel actual.
        $("#level-title").text("Level " + level);
        // Llama a la función `nextSequence` para iniciar la primera secuencia del juego.
        nextSequence();
        // Cambia el estado de `started` a verdadero para indicar que el juego ha comenzado.
        started = true;
    }
});

// Función que genera la siguiente secuencia de colores en el juego.
function nextSequence() {
    // Incrementa el nivel del juego en 1.
    level++;
    // Actualiza el texto del título para mostrar el nuevo nivel.
    $("#level-title").text("Level " + level);

    // Genera un número aleatorio entre 0 y 3.
    var randomNumber = Math.floor(Math.random() * 4);
    // Usa el número aleatorio para seleccionar un color del array `buttonColors`.
    var randomChosenColor = buttonColors[randomNumber];
    // Añade el color seleccionado a la secuencia del juego.
    gamePattern.push(randomChosenColor);

    // Hace que el botón correspondiente al color seleccionado parpadee.
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    // Reproduce el sonido correspondiente al color seleccionado.
    playSound(randomChosenColor);
}

// Esta función se ejecuta cuando se hace clic en un botón con la clase `btn`.
$(".btn").click(function() {
    // Obtiene el id del botón clicado, que corresponde al color del botón.
    var userChosenColor = $(this).attr("id");
    // Añade el color clicado a la secuencia de clics del usuario.
    userClickedPattern.push(userChosenColor);
    // Muestra la secuencia de clics del usuario en la consola para depuración.
    console.log(userClickedPattern);

    // Reproduce el sonido correspondiente al color clicado por el usuario.
    playSound(userChosenColor);
    // Añade una animación al botón clicado para indicar que fue presionado.
    animatePress(userChosenColor);
});

// Función para reproducir sonidos asociados a los colores.
function playSound(name) {
    // Crea un nuevo objeto de audio con el archivo de sonido correspondiente al nombre del color.
    var audio = new Audio("sounds/" + name + ".mp3");
    // Reproduce el sonido.
    audio.play();
}

// Función para animar el botón cuando es presionado por el usuario.
function animatePress(currentColor) {
    // Añade la clase `pressed` al botón con el id igual al color actual para aplicar el estilo de animación.
    $("#" + currentColor).addClass("pressed");
    // Después de 100 milisegundos, quita la clase `pressed` para terminar la animación.
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}
