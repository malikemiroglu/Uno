let value = ["0","1","2","3","4","5","6","7","8","9"];
let colors = ["green", "red", "darkorange", "dodgerblue"];
let players = [];
let cpu = [];
let deck = [];
let table = [];
let playersTurn = ["player-1","player-2","player-3","player-4"];
let turn = 1;

// kartlari desteye koyduk
function createCards() {
    for(let color of colors){
        for(let i = 0; i < value.length; i++) {

            let card = {color: color, value: value[i]};
            deck.push(card);
        };
    };
};
createCards();

// desteyi karistirdik
function shuffleCards() {
    deck.sort(() => Math.random() - 0.5);
};
shuffleCards();

// kartlari tum oyunculara dagitiyoruz
function giveCardsToPlayer() {
    for (let j = 0 ; j < 4 ; j ++) {
        let playerCards = [];
        for (let i = 0 ; i < 7 ; i++) {
            playerCards.push(deck.pop());
        }
        players.push(playerCards);
    };
};
giveCardsToPlayer();

// ortaya ilk koyulan kart ayarlandi
table.push(deck.pop());

// kullanicilar icin kartlarin html kodlarini hazirladik
function createCardHtml(color, value) {
        return `
        <div style="background-color:${color};" data-color="${color}" data-value="${value}" class="card">
            <span class="topNumber">${value}</span>
            <span class="underNumber">${value}</span>
            <span class="centerNumberBg">${value}</span>
            <span style="color:${color};" class="centerNumber">${value}</span>
        </div>
        `
};

let cardsContainer = document.querySelector('#cardsContainer');
let cpuTwo = document.querySelector('#player-2');
let cpuThree = document.querySelector('#player-3');
let cpuFour = document.querySelector('#player-4');
let deckObject = document.querySelector('#deck');
let tableCardObject = document.querySelector('#table');

// kullanicilarin eline kartlari dagitiyoruz
function renderUserCards() {
    for(let card of players[0]) {
        cardsContainer.innerHTML += createCardHtml(card.color,card.value);
    };

    for(let card of players[1]) {
        cpuTwo.innerHTML += createCardHtml(card.color,card.value);
    };

    for(let card of players[2]) {
        cpuThree.innerHTML += createCardHtml(card.color,card.value);
    };

    for(let card of players[3]) {
        cpuFour.innerHTML += createCardHtml(card.color,card.value);
    };
};
renderUserCards();

// deck icin kartlarin html kodlarini hazirladik
function createCardHtmlDeck(color,value, back = false) {
    return `
    <div class="card stackOfDeck ${back ? 'back': ''}" data-color="${color}" data-value="${value}" style="background-color:${color};">
        <span class="topNumber">${value}</span>
        <span class="underNumber">${value}</span>
        <span class="centerNumberBg">${value}</span>
        <span style="color:${color};" class="centerNumber">${value}</span>
    </div>
    `
};

// deckten cekilecek kartlar 
function renderDeck() {
    for(let card of deck){
        deckObject.innerHTML += createCardHtmlDeck(card.color, card.value, false);
    }
};
renderDeck();



// ortaya atilan kartlar
function renderTable() {
    let carta = table[table.length - 1];
    let angle = (Math.random() * - 15);
    
    tableCardObject.innerHTML += `
        <div style="background-color:${carta.color}; transform: rotateZ(${angle}deg);" class="card">
            <span class="topNumber">${carta.value}</span>
            <span class="underNumber">${carta.value}</span>
            <span class="centerNumberBg">${carta.value}</span>
            <span style="color:${carta.color};" class="centerNumber">${carta.value}</span>
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
    switch(turn){
        case 1:
            turn = 2;
            break;
        case 2:
            turn = 3;
            break;    
        case 3:
            turn = 4;
            break;
        case 4:
            turn = 1;
            break;
    }

    isDeckUsed = false;
}

// hangi kullanicin oynayabilecegini sorguluyoruz
function canCurrentUserPlay() {
    let currentPlayerCards;
    if(turn === 1) {
        currentPlayerCards = document.querySelectorAll('.cardsContainer .card');
    }else {
        currentPlayerCards = document.querySelectorAll('player-2 .card');
    }
    
    for(let card of currentPlayerCards) {
        if(isCardPlayable(card.dataset.color, card.dataset.value)) {
            return true;
        }
    }

    return false;
}

let isDeckUsed = false; // deck'ten kart eklemeyi engellemek icin

function playCard() {

    //table'a tiklatmiyorum.
    if(this.parentNode.classList.contains('table')){
        return;
    }
    
    if(this.parentNode.classList.contains('deck')){
        // isDeckUsed true olursa destemize deck'ten ikinci karti ekletmemek icin
        if(isDeckUsed === true){
            return;
        }

        //this = card clasını temsil ediyor burada
        // sira kimdeyse desckteki karti secilen divin alt cocugu olarak atiyor
        if (turn === 1){
            cardsContainer.appendChild(this);
        } else {
            cpuTwo.appendChild(this);
        }

        this.classList.remove('back','stackOfDeck');
        isDeckUsed = true;

        if(!canCurrentUserPlay()){
            changeTurn();
        }
        return;
    }

    if(!isCardPlayable(this.dataset.color, this.dataset.value)) return;

    // burasi düzeltilecek
    if(turn === 1 && !this.parentNode.classList.contains('cardsContainer')) return;
    if(turn === 2 && !this.parentNode.classList.contains('player-2')) return;
    if(turn === 3 && !this.parentNode.classList.contains('player-3')) return;
    if(turn === 4 && !this.parentNode.classList.contains('player-4')) return;

    let playerCardContainer = this.parentNode;

    tableCardObject.appendChild(this);
    table[table.length-1].color = this.dataset.color;
    table[table.length-1].value = this.dataset.value;

    if(playerCardContainer.children.length === 0) {
        alert('Kazanan oyuncu: ' + turn);
        cardElements.forEach(card => card.removeEventListener('click',playCard));
    }
    changeTurn();
};

