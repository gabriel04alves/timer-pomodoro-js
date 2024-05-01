const html = document.querySelector('html');
const focusBtn = document.querySelector('.app__card-button--foco');
const shortBtn = document.querySelector('.app__card-button--curto');
const longBtn = document.querySelector('.app__card-button--longo');
const title = document.querySelector('.app__title')
const buttons = document.querySelectorAll('.app__card-button');
const startOrPauseBtn = document.querySelector('#start-pause span');
const startOrPauseBtnIcon = document.querySelector('#start-pause i');
const timeDisplay = document.querySelector('#timer');

let elapsedSeconds = 1500;
let intervalId = null;
const focusMusicInput = document.querySelector('#alternar-musica');
const music = new Audio('./assets/audios/luna-rise-part-one.mp3');
const audioPlay = new Audio('./assets/audios/play.wav');
const audioPause = new Audio('./assets/audios/pause.mp3');
const audioTimeUp = new Audio('./assets/audios/beep.mp3');

music.loop = true;
focusMusicInput.addEventListener('change', () => {
    if(music.paused) {
        music.play();
    } else {
        music.pause();
    }
});

focusBtn.addEventListener('click', () => {
    elapsedSeconds = 1500;
    changeContext('foco');
    focusBtn.classList.add('active');
});
shortBtn.addEventListener('click', () => {
    elapsedSeconds = 300;
    changeContext('short');
    shortBtn.classList.add('active');
});
longBtn.addEventListener('click', () => {
    elapsedSeconds = 900;
    changeContext('long');
    longBtn.classList.add('active');
});

function changeContext(context) {
    showTime();
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });
    html.setAttribute('data-context', context);
    switch (context) {
        case 'foco':
            title.innerHTML = `
                Aumente sua eficiência,
                <b>mergulhe no que realmente importa.</b>
            `;
            break;
        case 'short':
            title.innerHTML = `
                Que tal fazer uma pausa breve? 
                <b>Recarregue suas energias!</b>
            `;
            break;
        case 'long':
            title.innerHTML = `
                É hora de relaxar um pouco.
                <b>Faça uma pausa prolongada.</b>
            `;
            break;
        default:
            break;
    }
}

const countdown = () => {
    if(elapsedSeconds <= 0){
        audioTimeUp.play()  
        alert('Encerrado!');
        reset();
        return;
    }
    elapsedSeconds -= 1;
    showTime();
};

document.querySelector('#start-pause').addEventListener('click', startOrPause);

function startOrPause() {
    if(intervalId){
        audioPause.play();  
        reset();
        return;
    }
    audioPlay.play();  
    intervalId = setInterval(countdown, 1000);
    startOrPauseBtn.textContent = `Pausar`; 
    startOrPauseBtnIcon.classList.remove('fa-play');
    startOrPauseBtnIcon.classList.add('fa-pause');
}

function reset() {
    clearInterval(intervalId); 
    startOrPauseBtn.textContent = `Começar`; 
    startOrPauseBtnIcon.classList.remove('fa-pause');
    startOrPauseBtnIcon.classList.add('fa-play');
    intervalId = null;
}

function showTime() {
    const time = new Date(elapsedSeconds * 1000);
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timeDisplay.innerHTML = `${formattedTime}`;
}

showTime();
