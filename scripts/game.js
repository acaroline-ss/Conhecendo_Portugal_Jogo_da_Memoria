// ====================
// CONFIGURAÇÃO INICIAL
// ====================

const urlParams = new URLSearchParams(window.location.search);
const themeName = urlParams.get('theme') || 'monumentos'; // Padrão: frutas

// Temas disponíveis
const themes = {
    monumentos: ['assets/images/monumentos/torre_de_belem.png',
        'assets/images/monumentos/castelo.png',
        'assets/images/monumentos/comercio.png',
        'assets/images/monumentos/mosteiro.png',
        'assets/images/monumentos/padrao.png',
        'assets/images/monumentos/palacio_pena.png',
        'assets/images/monumentos/ponte_dl.png',
        'assets/images/monumentos/serra_da_estrela.png'
    ],
    culinaria: ['assets/images/comidas/arroz_de_pato.png',
        'assets/images/comidas/bacalhau.png',
        'assets/images/comidas/caldo_verde.png',
        'assets/images/comidas/cozido.png',
        'assets/images/comidas/francesinha.png',
        'assets/images/comidas/pastel_de_nata.png',
        'assets/images/comidas/sardinhas.png',
        'assets/images/comidas/vinho.png'
    ],
    figuras: ['assets/images/figuras/vasco.png',
        'assets/images/figuras/afonso.png',
        'assets/images/figuras/amelia.png',
        'assets/images/figuras/cristiano.png',
        'assets/images/figuras/dom_pedro.png',
        'assets/images/figuras/fernando.png',
        'assets/images/figuras/quim.png',
        'assets/images/figuras/jose.png'],
    cidades: ['assets/images/cidades/aveiro.png',
        'assets/images/cidades/braga.png',
        'assets/images/cidades/castelo_branco.png',
        'assets/images/cidades/coimbra.png',
        'assets/images/cidades/guarda.png',
        'assets/images/cidades/lisboa.png',
        'assets/images/cidades/porto.png',
        'assets/images/cidades/viseu.png',
    ]
};

const descriptions = {
    // Monumentos
    'assets/images/monumentos/torre_de_belem.png': 'Torre de Belém: Monumento icônico de Lisboa, símbolo dos Descobrimentos.',
    'assets/images/monumentos/castelo.png': 'Castelo de São Jorge: Fortaleza histórica com vista panorâmica de Lisboa.',
    'assets/images/monumentos/comercio.png': 'Praça do Comércio: Importante praça histórica à beira do Tejo.',
    'assets/images/monumentos/mosteiro.png': 'Mosteiro dos Jerónimos: Patrimônio Mundial da UNESCO em Belém.',
    'assets/images/monumentos/padrao.png': 'Padrão dos Descobrimentos: Homenagem aos navegadores portugueses.',
    'assets/images/monumentos/palacio_pena.png': 'Palácio da Pena: Palácio colorido e romântico em Sintra.',
    'assets/images/monumentos/ponte_dl.png': 'Ponte Dom Luís I: Ponte metálica emblemática sobre o Douro, no Porto.',
    'assets/images/monumentos/serra_da_estrela.png': 'Serra da Estrela: Região montanhosa famosa por sua neve e queijo.',

    // Culinária
    'assets/images/comidas/arroz_de_pato.png': 'Arroz de Pato: Prato tradicional assado com pato desfiado.',
    'assets/images/comidas/bacalhau.png': 'Bacalhau: Peixe seco e salgado, estrela da culinária portuguesa.',
    'assets/images/comidas/caldo_verde.png': 'Caldo Verde: Sopa típica com couve e chouriço.',
    'assets/images/comidas/cozido.png': 'Cozido à Portuguesa: Prato robusto com carnes, enchidos e legumes.',
    'assets/images/comidas/francesinha.png': 'Francesinha: Sanduíche recheado e coberto com molho especial do Porto.',
    'assets/images/comidas/pastel_de_nata.png': 'Pastel de Nata: Doce de massa folhada com creme de ovos.',
    'assets/images/comidas/sardinhas.png': 'Sardinhas Assadas: Prato típico das festas populares.',
    'assets/images/comidas/vinho.png': 'Vinho do Porto: Famoso vinho fortificado português.',

    // Figuras históricas
    'assets/images/figuras/vasco.png': 'Vasco da Gama: Navegador que descobriu o caminho marítimo para a Índia.',
    'assets/images/figuras/afonso.png': 'Dom Afonso Henriques: Primeiro rei de Portugal.',
    'assets/images/figuras/amelia.png': 'Rainha Amélia: Última rainha consorte de Portugal.',
    'assets/images/figuras/cristiano.png': 'Cristiano Ronaldo: Um dos maiores jogadores de futebol do mundo.',
    'assets/images/figuras/dom_pedro.png': 'Dom Pedro IV: Rei de Portugal e imperador do Brasil.',
    'assets/images/figuras/fernando.png': 'Fernando Pessoa: Poeta e escritor modernista.',
    'assets/images/figuras/quim.png': 'Quim Barreiros: Cantor popular português com letras bem-humoradas e de duplo sentido.',
    'assets/images/figuras/jose.png': 'José Saramago: Nobel de Literatura, autor de "Ensaio sobre a cegueira".',

    // Cidades
    'assets/images/cidades/aveiro.png': 'Aveiro: Conhecida como a "Veneza portuguesa", famosa pelos moliceiros.',
    'assets/images/cidades/braga.png': 'Braga: Cidade antiga com forte tradição religiosa.',
    'assets/images/cidades/castelo_branco.png': 'Castelo Branco: Cidade do interior com jardins e tapeçarias históricas.',
    'assets/images/cidades/coimbra.png': 'Coimbra: Cidade universitária com tradição intelectual.',
    'assets/images/cidades/guarda.png': 'Guarda: Cidade mais alta de Portugal, com clima serrano.',
    'assets/images/cidades/lisboa.png': 'Lisboa: Capital de Portugal, conhecida pela sua história, colinas e fado.',
    'assets/images/cidades/porto.png': 'Porto: Cidade ribeirinha famosa pelo vinho e arquitetura.',
    'assets/images/cidades/viseu.png': 'Viseu: Centro histórico com forte herança romana e medieval.'
};


// Variáveis do jogo
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer = null;
let seconds = 0;
let isGameStarted = false;
let currentDescription = null;

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
        monumentos: 'Monumentos',
        culinaria: 'Culinária',
        figuras: 'Figuras Históricas',
        cidades: 'Brasão'
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
            <div class="card-face card-front"><img src="${symbol}" alt="Imagem do tema"></div>
            <div class="card-face card-back">🇵🇹</div>
        `;
        
        card.addEventListener('click', flipCard);
        memoryGame.appendChild(card);
    });
}

// Vira uma carta
function flipCard() {
    // Remove a descrição ao clicar em qualquer carta
    if (currentDescription) {
        currentDescription.remove();
        currentDescription = null;
    }

    // Restante do código existente
    if (flippedCards.length >= 2 || 
        this.classList.contains('flipped') || 
        this.classList.contains('matched')) return;
        
    sounds.flip.currentTime = 0;
    sounds.flip.play();
    
    if (!isGameStarted) {
        startTimer();
        isGameStarted = true;
    }
    
    this.classList.add('flipped');
    flippedCards.push(this);
    
    if (flippedCards.length === 2) {
        moves++;
        movesDisplay.textContent = moves;
        checkForMatch();
    }
}

// Verifica se as cartas formam um par
function checkForMatch() {
    const [card1, card2] = flippedCards;
    const img1 = card1.querySelector('.card-front img').src;
    const img2 = card2.querySelector('.card-front img').src;

    if (img1 === img2) {
        sounds.match.play();
        card1.classList.add('matched');
        card2.classList.add('matched');
        flippedCards = [];
        matchedPairs++;

        // Exibe a descrição do par
        const description = getDescription(img1);
        showDescription(description);

        // Verifica se o jogo acabou (todos os pares encontrados)
        if (matchedPairs === themes[themeName].length) {
            setTimeout(() => {
                sounds.win.play();
                showWinModal(); // ← Nova tela de vitória personalizada
                stopTimer();
            }, 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function showDescription(text) {
    // Remove a descrição anterior se existir
    if (currentDescription) {
        currentDescription.remove();
    }
    
    // Cria a nova descrição
    currentDescription = document.createElement('div');
    currentDescription.className = 'description-box';
    currentDescription.textContent = text;
    document.body.appendChild(currentDescription);
}

function getDescription(imgSrc) {
    // Pega apenas o nome do arquivo (ex: 'torre_de_belem.png')
    const filename = imgSrc.substring(imgSrc.lastIndexOf('/') + 1); 
    
    // Procura a descrição correspondente no objeto 'descriptions'
    for (const key in descriptions) {
        if (key.includes(filename)) {
            return descriptions[key];
        }
    }
    return "Descrição não encontrada."; // Fallback seguro
}

function showWinModal() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div class="win-modal">
            <h2>🎉 Portugal na Memória!</h2>
            <p>Você completou o tema <strong>${getThemeName(themeName)}</strong> em:</p>
            <p>${moves} movimentos | ${formatTime(seconds)}</p>
            <div class="modal-buttons">
                <button id="play-again">Jogar Novamente</button>
                <button id="change-theme">Escolher Tema</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    document.body.appendChild(modal);

    // Botão "Jogar Novamente"
    document.getElementById('play-again').addEventListener('click', () => {
        overlay.remove();
        modal.remove();
        resetGameState();
        initGame();
    });

    // Botão "Escolher Tema" (NOVO)
    document.getElementById('change-theme').addEventListener('click', () => {
        window.location.href = 'index.html'; // Redireciona para a tela de temas
    });
}

if (matchedPairs === themes[themeName].length) {
    setTimeout(() => {
        sounds.win.play();
        showWinModal(); 
        stopTimer();
    }, 500);
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
    // Limpa a descrição atual
    if (currentDescription) {
        currentDescription.remove();
        currentDescription = null;
    }
    
    sounds.reset.play();
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
