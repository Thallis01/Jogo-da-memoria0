const cardsArray = [
    '😀', '😀',
    '😢', '😢',
    '😡', '😡',
    '😱', '😱',
    '😍', '😍',
    '😎', '😎',
    '😴', '😴',
    '🤯', '🤯'
];

let firstCard = null;
let secondCard = null;
let matches = 0;
let timeLeft = 80;
let gameInterval;
let soundEnabled = true;

// Função para embaralhar as cartas
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Função para criar o tabuleiro
function createBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    const shuffledCards = shuffle([...cardsArray]);

    shuffledCards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.emoji = emoji;
        card.dataset.index = index;
        card.innerHTML = '';
        card.addEventListener('click', handleCardClick);
        gameBoard.appendChild(card);
    });
}

// Função para iniciar o jogo
function startGame() {
    matches = 0;
    firstCard = null;
    secondCard = null;
    timeLeft = 80;
    document.getElementById('result').classList.add('hidden');
    createBoard();
    startTimer();
}

// Função de clique nas cartas
function handleCardClick(event) {
    const card = event.target;

    // Ignorar cliques em cartas já reveladas
    if (card.classList.contains('flipped')) return;

    if (!firstCard) {
        firstCard = card;
        card.innerHTML = card.dataset.emoji;
        card.classList.add('flipped');
        playClickSound();
    } else if (!secondCard) {
        secondCard = card;
        card.innerHTML = card.dataset.emoji;
        card.classList.add('flipped');
        playClickSound();

        // Verificar se as cartas combinam
        if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
            playSuccessSound();
            firstCard = null;
            secondCard = null;
            matches++;
            if (matches === cardsArray.length / 2) {
                endGame();
            }
        } else {
            playErrorSound();
            setTimeout(() => {
                firstCard.innerHTML = '';
                secondCard.innerHTML = '';
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                firstCard = null;
                secondCard = null;
            }, 1000);
        }
    }
}

// Função para finalizar o jogo
// Função para finalizar o jogo e mostrar a comemoração
function endGame() {
    clearInterval(gameInterval);
    showCongratsMessage();
}


// Função do timer
function startTimer() {
    document.getElementById('timer').textContent = formatTime(timeLeft);
    gameInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = formatTime(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            alert('Tempo esgotado! Tente novamente.');
            startGame();
        }
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `Tempo: ${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Sons
function playClickSound() {
    if (soundEnabled) {
        // Adicione um som de clique aqui
        console.log('Clique!');
    }
}

// Funções para tocar sons

function playClickSound() {
    if (soundEnabled) {
        const clickSound = document.getElementById('clickSound');
        clickSound.play(); // Tocar som de clique
    }
}

function playSuccessSound() {
    if (soundEnabled) {
        const successSound = document.getElementById('successSound');
        successSound.play(); // Tocar som de sucesso
    }
}

function playErrorSound() {
    if (soundEnabled) {
        const errorSound = document.getElementById('errorSound');
        errorSound.play(); // Tocar som de erro
    }
}

// Inicializar música de fundo
const backgroundMusic = document.getElementById('backgroundMusic');

// Tocar música de fundo quando o jogo começa
function playBackgroundMusic() {
    if (soundEnabled) {
        backgroundMusic.play();
    }
}

// Pausar música de fundo
function pauseBackgroundMusic() {
    backgroundMusic.pause();
}

// Funções de controle de volume
document.getElementById('volumeBtn').addEventListener('click', () => {
    soundEnabled = false;
    document.getElementById('volumeBtn').style.display = 'none';
    document.getElementById('muteBtn').style.display = 'inline';
    pauseBackgroundMusic();  // Pausa a música quando o som é mutado
});

document.getElementById('muteBtn').addEventListener('click', () => {
    soundEnabled = true;
    document.getElementById('volumeBtn').style.display = 'inline';
    document.getElementById('muteBtn').style.display = 'none';
    playBackgroundMusic();  // Toca a música quando o som é ativado
});

// Modifique a função de iniciar o jogo para tocar a música de fundo
function startGame() {
    matches = 0;
    firstCard = null;
    secondCard = null;
    timeLeft = 40;
    document.getElementById('result').classList.add('hidden');
    createBoard();
    startTimer();
    playBackgroundMusic();  // Tocar a música quando o jogo começa
}

// Funções de controle de volume
document.getElementById('volumeBtn').addEventListener('click', () => {
    soundEnabled = false;
    document.getElementById('volumeBtn').style.display = 'none';
    document.getElementById('muteBtn').style.display = 'inline';
});

document.getElementById('muteBtn').addEventListener('click', () => {
    soundEnabled = true;
    document.getElementById('volumeBtn').style.display = 'inline';
    document.getElementById('muteBtn').style.display = 'none';
});

// Reiniciar jogo
document.getElementById('restartBtn').addEventListener('click', () => {
    clearInterval(gameInterval);
    startGame();
});

// Função para criar confetes
function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    confettiContainer.innerHTML = ''; // Limpa confetes anteriores
    const colors = ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7'];

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti-piece');
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`; // Entre 2 e 5 segundos de queda
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confettiContainer.appendChild(confetti);
    }
}

// Função para exibir a mensagem de parabéns com confetes
function showCongratsMessage() {
    createConfetti();
    const congratsMessage = document.getElementById('congratsMessage');
    congratsMessage.classList.remove('hidden');
    congratsMessage.style.opacity = '1';
    congratsMessage.style.pointerEvents = 'all'; // Permitir interação após aparecer
}
function hideCongratsMessage() {
    const congratsMessage = document.getElementById('congratsMessage');
    congratsMessage.style.opacity = '0';
    congratsMessage.style.pointerEvents = 'none'; // Evita interação enquanto está escondido
    setTimeout(() => {
        congratsMessage.classList.add('hidden');
    }, 1000); // Esconde após a transição de 1 segundo
}

// Reiniciar jogo
document.getElementById('restartBtn').addEventListener('click', () => {
    clearInterval(gameInterval);
    hideCongratsMessage();
    startGame();
});
 // Reiniciar jogo através do botão de comemoração
document.getElementById('restartBtnCongrats').addEventListener('click', () => {
    clearInterval(gameInterval);
    hideCongratsMessage();
    startGame();
});
// Inicializar o jogo
startGame();
 