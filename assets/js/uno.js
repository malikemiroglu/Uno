let value = ["0","1","2","3","4","5","6","7","8","9"];
let colors = ["green", "red", "darkorange", "dodgerblue"];
let players = [];
let cpu = [];
let deck = [];
let table = [];
let turn = 1;
let isDeckUsed = false;

function createCards() {
    for(let color of colors){
        for(let i = 0; i < value.length; i++) {
            let card = {color: color, value: value[i]};
            deck.push(card);
        };
    };
};
createCards();

const shuffleCards = () => deck.sort(() => Math.random() - 0.5);
shuffleCards();

function giveCardsToPlayer() {
    for (let j = 0 ; j < 4 ; j ++) {
        players[j] = deck.splice(0, 7);
    };
};
giveCardsToPlayer();

table.push(deck.pop());

function createCardHtml(color, value, isBack = false) {
    if(isBack) {
        return `
        <div class="card back" style="background-color:${color};" data-color="${color}" data-value="${value}">
            <span class="topNumber">${value}</span>
            <span class="underNumber">${value}</span>
            <span class="centerNumberBg centerNumberBgOff">${value}</span>
            <span style="color:${color};" class="centerNumber">${value}</span>
        </div>
        `;
    } else {
        return `
        <div style="background-color:${color};" data-color="${color}" data-value="${value}" class="card">
            <span class="topNumber">${value}</span>
            <span class="underNumber">${value}</span>
            <span class="centerNumberBg">${value}</span>
            <span style="color:${color};" class="centerNumber">${value}</span>
        </div>
        `
    }
};

let cardsContainer = document.querySelector('#cardsContainer');
let cpuTwo = document.querySelector('#player-2');
let cpuThree = document.querySelector('#player-3');
let cpuFour = document.querySelector('#player-4');
let deckObject = document.querySelector('#deck');
let tableCardObject = document.querySelector('#table');
const playerClasses = ['cardsContainer', 'player-2', 'player-3', 'player-4'];

function renderUserCards() {
    for(let card of players[0]) {
        cardsContainer.innerHTML += createCardHtml(card.color,card.value);
    };

    for(let card of players[1]) {
        cpuTwo.innerHTML += createCardHtml(card.color, card.value, true);
    };

    for(let card of players[2]) {
        cpuThree.innerHTML += createCardHtml(card.color,card.value, true);
    };

    for(let card of players[3]) {
        cpuFour.innerHTML += createCardHtml(card.color,card.value, true);
    };

};
renderUserCards();

function createCardHtmlDeck(color,value, isBack = false) {
    return (`
    <div class="card stackOfDeck ${isBack ? 'back': ''}" data-color="${color}" data-value="${value}" style="background-color:${color};">
        <span class="topNumber">${value}</span>
        <span class="underNumber">${value}</span>
        <span class="centerNumberBg centerNumberBgOff">${value}</span>
        <span style="color:${color};" class="centerNumber">${value}</span>
    </div>`)
};

function renderDeck() {
    for(let card of deck){
        deckObject.innerHTML += createCardHtmlDeck(card.color, card.value, true);
    };    
};
renderDeck();

function renderTable() {
    let card = table[table.length - 1];
    let angle = (Math.random() * - 15);
    
    tableCardObject.innerHTML += `
        <div style="background-color:${card.color}; transform: rotateZ(${angle}deg);" class="card" data-color="${card.color}" data-value="${card.value}">
            <span class="topNumber">${card.value}</span>
            <span class="underNumber">${card.value}</span>
            <span class="centerNumberBg">${card.value}</span>
            <span style="color:${card.color};" class="centerNumber">${card.value}</span>
        </div>
    `
};
renderTable();

let cardElements = document.querySelectorAll('.card');
for(let cardElement of cardElements) {
    cardElement.addEventListener('click', playCard);
}

function isCardPlayable(cardColor, cardValue) {
    if(table[table.length-1].color === cardColor || table[table.length-1].value === cardValue) {
        return true;
    };
    return false;
};

function changeTurn() {
    turn = (turn % 4) + 1;
    isDeckUsed = false;
};

function canCurrentUserPlay() {
    let currentPlayerCards;
    switch(turn){
        case 1:
            currentPlayerCards = document.querySelectorAll('.cardsContainer .card');
            break;
        case 2:
            currentPlayerCards = document.querySelectorAll('.player-2 .card');
            break;
        case 3:
            currentPlayerCards = document.querySelectorAll('.player-3 .card');
            break;
        case 4:
            currentPlayerCards = document.querySelectorAll('.player-4 .card');
            break;
    }
    for(let card of currentPlayerCards) {
        if(isCardPlayable(card.dataset.color, card.dataset.value)) {
            return true;
        }
    }
    return false;
};

function playerTurn(){
    const playersTurn = [cardsContainer, cpuTwo, cpuThree, cpuFour];
    for(let i=1; i<=4; i++){
        playersTurn[i-1].classList.toggle('myTurn', i === turn);
    }
}
playerTurn();

function playCard() {
    if(this.parentNode.classList.contains('table')){
        return;
    }

    if (isCardPlayable(this.dataset.color, this.dataset.value)) {
        if ((turn === 2 || turn === 3 || turn === 4) && this.parentNode.classList.contains('player-' + turn)) {
            this.classList.remove('back');
            this.children[2].classList.remove('centerNumberBgOff');
        }
    }

    if(this.parentNode.classList.contains('deck')){
        drawCards.call(this);
        deck.pop();
        return;
    }

    if(!isCardPlayable(this.dataset.color, this.dataset.value)) return;

    for(let i=0 ; i<4 ; i++){
        if(players[turn - 1].length === 1){
            alert(`Player-${i+1} UNO!`);
        }
    }

    const currentPlayer = playerClasses[turn - 1];
    if (!this.parentNode.classList.contains(currentPlayer)) return;

    tableCardObject.appendChild(this);
    table.push({ color: this.dataset.color, value: this.dataset.value });
    this.classList.add(`cardPlayAnimation${turn}`);


    removeFromPlayerCards(this, players[turn - 1]);
    checkGameEnd();
    changeTurn();
    playerTurn();

    if (turn !== 1) {
        const currentPlayerCards = document.querySelectorAll(`.player-${turn} .card`);
        playCardByCPU(currentPlayerCards);
    }
};

function drawCards() {
    if(isDeckUsed){
        return;
    }

    this.classList.add(`cardDrawAnimation${turn}`);

    if (turn === 1){
        cardsContainer.appendChild(this);
        this.classList.remove('back', 'stackOfDeck');
        this.children[2].classList.remove('centerNumberBgOff'); 
        players[0].push({ color: this.dataset.color, value: this.dataset.value });
    }else if(turn === 2) {
        cpuTwo.appendChild(this);
        this.classList.remove('stackOfDeck');
        players[1].push({ color: this.dataset.color, value: this.dataset.value });
    }else if(turn === 3) {
        cpuThree.appendChild(this);
        this.classList.remove('stackOfDeck');
        players[2].push({ color: this.dataset.color, value: this.dataset.value });
    }else if(turn === 4) {
        cpuFour.appendChild(this);
        this.classList.remove('stackOfDeck');
        players[3].push({ color: this.dataset.color, value: this.dataset.value });
    }
    
    isDeckUsed = true; 
    
    if(!canCurrentUserPlay()){
        changeTurn();
        playerTurn();
    }

    if (turn !== 1) {
        const currentPlayerCards = document.querySelectorAll(`.player-${turn} .card`);
        playCardByCPU(currentPlayerCards);
    }
}

function playCardByCPU(currentPlayerCards) {
    const cardsArray = Array.from(currentPlayerCards);
    const matchingCards = cardsArray.filter(card => isCardPlayable(card.dataset.color, card.dataset.value));
    const selectedCard = matchingCards.length ? matchingCards[Math.floor(Math.random() * matchingCards.length)] : document.querySelector('.deck .card:last-child');
    setTimeout(() => {
        selectedCard.click();
    }, 1000);
}

function removeFromPlayerCards(card, playerCards) {
    for (let i = 0; i < playerCards.length; i++) {
        if (playerCards[i].color === card.dataset.color && playerCards[i].value === card.dataset.value) {
            playerCards.splice(i, 1);
            break;
        }
    }
}

function checkGameEnd() {
    for (let i = 0; i < players.length; i++) {
        if (players[i].length === 0) {
            alert('Kazanan oyuncu: ' + (i + 1));
            cardElements.forEach(card => card.removeEventListener('click', playCard));
            return;
        }
    }
    if(deck.length === 0) {
        const restartGame = confirm('Destede kart kalmadı. Oyun berabere bitti. Yeniden başlatmak ister misiniz?');

        if (restartGame) {
            window.location.reload();
        } else {
            cardElements.forEach(card => card.removeEventListener('click', playCard));
        }
    }
}