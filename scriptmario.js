const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const gameOverScreen = document.querySelector('.game-over');
const clouds = document.querySelector('.clouds');
const backButton = document.getElementById('backButton');
const restartButton = document.getElementById('restartButton');

const jump = () => {
    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
};

const backToPrevious = () => {
    console.log('Voltar para trás');
};

const restartGame = () => {
    console.log('Recomeçar o jogo');
};

const handleGameOver = () => {
    mario.src = 'game-over.png';
    mario.style.width = '75px';
    mario.style.marginLeft = '50px';
    clearInterval(loop);
    gameOverScreen.style.display = 'block';
    clouds.classList.add('clouds-stop');
};

backButton.addEventListener('click', backToPrevious);
restartButton.addEventListener('click', restartGame);

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        handleGameOver();
    }
}, 10);

document.addEventListener('keydown', jump);

