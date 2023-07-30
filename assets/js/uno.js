let value = ["1","1","1","1","1",   "1","1","1","1"];
let colors = ["green", "red", "darkorange", "dodgerblue"];
let players = [];
let cpu = [];
let deck = [];
let table = [];
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
const shuffleCards = () => deck.sort(() => Math.random() - 0.5);
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

// kullanicilarin eline kartlari dagitiyoruz
function renderUserCards() {
    for(let card of players[0]) {
        cardsContainer.innerHTML += createCardHtml(card.color,card.value);
    };

    for(let card of players[1]) {
        cpuTwo.innerHTML += createCardHtml(card.color, card.value, false);
    };

    for(let card of players[2]) {
        cpuThree.innerHTML += createCardHtml(card.color,card.value, false);
    };

    for(let card of players[3]) {
        cpuFour.innerHTML += createCardHtml(card.color,card.value, false);
    };

};
renderUserCards();

// deck icin kartlarin html kodlarini hazirladik
function createCardHtmlDeck(color,value, isBack = false) {
    return (`
    <div class="card stackOfDeck ${isBack ? 'back': ''}" data-color="${color}" data-value="${value}" style="background-color:${color};">
        <span class="topNumber">${value}</span>
        <span class="underNumber">${value}</span>
        <span class="centerNumberBg centerNumberBgOff">${value}</span>
        <span style="color:${color};" class="centerNumber">${value}</span>
    </div>`)
};

// deckten cekilecek kartlar 
function renderDeck() {
    for(let card of deck){
        deckObject.innerHTML += createCardHtmlDeck(card.color, card.value, true);
    };    
};
renderDeck();

// ortaya atilan kartlar
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

// kart oynayabiliyor mu kontrol
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
};

// hangi kullanicin oynayabilecegini sorguluyoruz
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
    
    // kart oynayabiliyor mu kontrol
    for(let card of currentPlayerCards) {
        if(isCardPlayable(card.dataset.color, card.dataset.value)) {
            return true;
        }
    }

    return false;
};

// oynama sirasinin kimde oldugunu gosterir
function playerTurn(){
    switch(turn){
        case 1:
            cpuTwo.classList.remove('myTurn');
            cpuThree.classList.remove('myTurn');
            cpuFour.classList.remove('myTurn');
            cardsContainer.classList.add('myTurn');
            break;
        case 2:
            cpuFour.classList.remove('myTurn');
            cpuThree.classList.remove('myTurn');
            cardsContainer.classList.remove('myTurn');
            cpuTwo.classList.add('myTurn');
            break;
        case 3:
            cpuFour.classList.remove('myTurn');
            cardsContainer.classList.remove('myTurn');
            cpuTwo.classList.remove('myTurn');
            cpuThree.classList.add('myTurn');
            break;
        case 4:
            cpuTwo.classList.remove('myTurn');
            cardsContainer.classList.remove('myTurn');
            cpuThree.classList.remove('myTurn');
            cpuFour.classList.add('myTurn');
            break;
    }
}
playerTurn();

let isDeckUsed = false; // deck'ten kart eklemeyi engellemek icin

function playCard() {
    //table'a tiklatmiyorum.
    if(this.parentNode.classList.contains('table')){
        return;
    }

    // cpu'lardaki kartlara tiklaninca ortadaki kartla ayni degilse on tarafi gosterilmemesi icin
    if (isCardPlayable(this.dataset.color, this.dataset.value)) {
        if ((turn === 2 || turn === 3 || turn === 4) && this.parentNode.classList.contains('player-' + turn)) {
            this.classList.remove('back');
            this.children[2].classList.remove('centerNumberBgOff');
        }
    }

    if(this.parentNode.classList.contains('deck')){
        drawCards.call(this);
        return;
    }

    if(!isCardPlayable(this.dataset.color, this.dataset.value)) return;

    // sira kimde ise sadece o oyunucunun oynamasini saglar
    if(turn === 1 && !this.parentNode.classList.contains('cardsContainer')) return;
    if(turn === 2 && !this.parentNode.classList.contains('player-2')) return;
    if(turn === 3 && !this.parentNode.classList.contains('player-3')) return;
    if(turn === 4 && !this.parentNode.classList.contains('player-4')) return;

    tableCardObject.appendChild(this);
    table.push({ color: this.dataset.color, value: this.dataset.value });

    switch (turn) {
        case 1:
            removeFromPlayerCards(this, players[0]);
            break;
        case 2:
            removeFromPlayerCards(this, players[1]);
            break;
        case 3:
            removeFromPlayerCards(this, players[2]);
            break;
        case 4:
            removeFromPlayerCards(this, players[3]);
            break;
    }

    checkGameEnd();

    changeTurn();
    playerTurn();

    if (turn !== 1) {
        let currentPlayerCards;
        switch (turn) {
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

        // CPU oyuncusu için hamleyi oyna
        playCardByCPU(currentPlayerCards);
    }
};

function drawCards() {
    // isDeckUsed true olursa destemize deck'ten ikinci karti ekletmemek icin
    if(isDeckUsed){
        return;
    }

    //this = card clasını temsil ediyor burada
    // sira kimdeyse desckteki karti secilen divin alt cocugu olarak atiyor
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
    
    isDeckUsed = true; // deck'ten ikinci karti eklemeyi engellemek icin
    

    if(!canCurrentUserPlay()){
        changeTurn();
        playerTurn();
    }

    if (turn !== 1) {
        let currentPlayerCards;
        switch (turn) {
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

        // CPU oyuncusu için hamleyi oyna
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
}