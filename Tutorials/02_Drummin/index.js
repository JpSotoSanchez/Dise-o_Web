document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener("keydown", function(event) {
        const soundMap = {
            'w': 'sounds/tom-1.mp3',
            'a': 'sounds/tom-2.mp3',
            's': 'sounds/tom-3.mp3',
            'd': 'sounds/tom-4.mp3',
            'j': 'sounds/snare.mp3',
            'k': 'sounds/crash.mp3',
            'l': 'sounds/kick-bass.mp3'
        };
        const key = event.key;
        if (soundMap[key]) { 
            var crash = new Audio(soundMap[key]);
            crash.play(); 
            
            const sonido = document.getElementById(key); 
            sonido.classList.add("pressed"); 
            
            setTimeout(function() {
                sonido.classList.remove("pressed"); // Remover la clase después de 100 ms
            }, 100);
        }
    });
});

