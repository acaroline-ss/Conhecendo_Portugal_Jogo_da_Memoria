// ====================
// CONFIGURAÇÃO INICIAL
// ====================

const urlParams = new URLSearchParams(window.location.search);
const themeName = urlParams.get('theme') || 'fruits'; // Padrão: frutas

// Temas disponíveis
const themes = {
    fruits: ['🍎', '🍌', '🍒', '🍓', '🍊', '🍋', '🍉', '🍇'],
    animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'],
    sports: ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🎱'],
    flags: ['🇧🇷', '🇺🇸', '🇪🇸', '🇫🇷', '🇩🇪', '🇯🇵', '🇮🇹', '🇦🇷']
};

// Variáveis do jogo
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer = null;
let seconds = 0;
let isGameStarted = false;

// Elementos DOM
const memoryGame = document.getElementById('memory-game');
const movesDisplay = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');
const resetButton = document.getElementById('reset-btn');

// Sons do jogo
const sounds = {
    flip: new Audio('sounds/flip.mp3'),
    match: new Audio('sounds/match.mp3'),
    win: new Audio('sounds/win.mp3'),
    reset: new Audio('sounds/reset.mp3')
};

// Configura volume (0 a 1)
sounds.flip.volume = 0.3;
sounds.match.volume = 0.5;
sounds.win.volume = 0.7;

// ====================
// FUNÇÕES PRINCIPAIS
// ====================

// Inicializa o jogo com o tema selecionado
function initGame() {
    // Duplica os símbolos para formar pares
    cards = [...themes[themeName], ...themes[themeName]];
    shuffleCards();
    createCards();
    resetGameState();
    
    // Atualiza o título com o tema
    document.querySelector('header h1').textContent += ` - ${getThemeName(themeName)}`;
}

// Retorna o nome formatado do tema
function getThemeName(theme) {
    const names = {
        fruits: 'Frutas',
        animals: 'Animais',
        sports: 'Esportes',
        flags: 'Bandeiras'
    };
    return names[theme] || '';
}

// Embaralha as cartas (Fisher-Yates)
function shuffleCards() {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

// Cria as cartas no DOM
function createCards() {
    memoryGame.innerHTML = '';
    
    cards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;
        
        card.innerHTML = `
            <div class="card-face card-front">${symbol}</div>
            <div class="card-face card-back">?</div>
        `;
        
        card.addEventListener('click', flipCard);
        memoryGame.appendChild(card);
    });
}

// Vira uma carta
function flipCard() {
    // Impede ações inválidas
    if (flippedCards.length >= 2 || 
        this.classList.contains('flipped') || 
        this.classList.contains('matched')) return;
        sounds.flip.currentTime = 0; // Reinicia o som se já estiver tocando
        sounds.flip.play(); // Toca o som
    
    // Inicia o timer no primeiro clique
    if (!isGameStarted) {
        startTimer();
        isGameStarted = true;
    }
    
    this.classList.add('flipped');
    flippedCards.push(this);
    
    // Verifica par quando duas cartas estão viradas
    if (flippedCards.length === 2) {
        moves++;
        movesDisplay.textContent = moves;
        checkForMatch();
    }
}

// Verifica se as cartas formam um par
function checkForMatch() {
    const [card1, card2] = flippedCards;
    const symbol1 = card1.querySelector('.card-front').textContent;
    const symbol2 = card2.querySelector('.card-front').textContent;
    
    if (symbol1 === symbol2) {
        sounds.match.play(); // Toca som de acerto
        // Par encontrado
        card1.classList.add('matched');
        card2.classList.add('matched');
        flippedCards = [];
        matchedPairs++;
        
        // Verifica vitória
        if (matchedPairs === themes[themeName].length) {
            setTimeout(() => {
                sounds.win.play(); // Toca som de vitória
                alert(`🎉 Parabéns!\nVocê completou o jogo em ${moves} movimentos e ${formatTime(seconds)}!`);
                stopTimer();
            }, 500);
        }
    } else {
        // Não é par - volta as cartas após 1 segundo
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

// ====================
// TEMPORIZADOR
// ====================

function startTimer() {
    timer = setInterval(() => {
        seconds++;
        timerDisplay.textContent = formatTime(seconds);
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// ====================
// CONTROLES DO JOGO
// ====================

// Reinicia o estado do jogo (sem recarregar a página)
function resetGameState() {
    sounds.reset.play(); // Toca som de reinício
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    seconds = 0;
    isGameStarted = false;
    
    movesDisplay.textContent = '0';
    timerDisplay.textContent = '00:00';
    
    stopTimer();
}

// ====================
// EVENT LISTENERS
// ====================

// Botão de reiniciar
resetButton.addEventListener('click', () => {
    resetGameState();
    initGame();
});

// Inicia o jogo quando a página carrega
document.addEventListener('DOMContentLoaded', initGame);