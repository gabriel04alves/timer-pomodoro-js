let blinkingInterval;

function startBlinking() {
    blinkingInterval = setInterval(function() {
        document.title = (document.title === " ") ? " " : "Concentre-se!";
    }, 1000); 
}

function stopBlinking() {
    clearInterval(blinkingInterval);
    document.title = "Pomodoro App";
}

window.onblur = function() {
    startBlinking();
};

window.onfocus = function() {
    stopBlinking();
};

startBlinking(); 
