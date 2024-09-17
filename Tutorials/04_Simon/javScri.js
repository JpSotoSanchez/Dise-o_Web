const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];

function nextSequence() {
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name) {
    const audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
