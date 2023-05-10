let cards = [];
let player = [];
let cpu = [];
let deck = [];
let table = [];

for(let i = 0; i <= 9; i++){
    cards.push({color: 'green', number: i});

    cards.push({color: 'red', number: i});

    cards.push({color: 'yellow', number: i});

    cards.push({color: 'blue', number: i});
};

cards.sort(function(){
    return Math.random() - 0.5
});

let players = ["player one", "player two"];

for(let i = 0; i < 7; i++){
    player.push(cards.shift());
    cpu.push(cards.shift());
}

table.push(cards.shift());

deck = cards;

// state -- durum
// siranin kimde oldugunu belirtiyoruz
let turn = 1;

function createCardHtml(color, number){
    return `<div class="card ${color}" data-color="${color}" data-number="${number}" >${number}</div>`;
}

const cpuContainer = document.querySelector('.cpu');
const tableContainer = document.querySelector('.table');
const playerContainer = document.querySelector('.player');
const deckContainer = document.querySelector('.deck');

for(let card of player){
    playerContainer.innerHTML += createCardHtml(card.color, card.number);
}

for(let card of cpu){
    cpuContainer.innerHTML += createCardHtml(card.color, card.number);
}

for(let card of deck){
    deckContainer.innerHTML += createCardHtml(card.color, card.number);
}

tableContainer.innerHTML += createCardHtml(table[0].color, table[0].number);

let cardElements = document.querySelectorAll('.card');

for(let cardElement of cardElements) {
    cardElement.addEventListener('click', playCard);
}

function isCardPlayable(cardColor, cardNumber) {
    let lastCardOnTable = document.querySelector('.table .card:last-child');
    if(lastCardOnTable.dataset.color === cardColor || lastCardOnTable.number === cardNumber){
        return true;
    }

    return false;
}

function playCard() {
    // console.log(this);
    if(isCardPlayable(this.dataset.color,this.dataset.number)){
        tableContainer.appendChild(this);
    }
}

function playCard(cardList, index) {
    let currentCard = table[table.length - 1];
    let playedCard = cardList[index];

    if(currentCard.color === playedCard || currentCard.number === playedCard) {
        table.push(playedCard);
        cardList.splice(index,1);
    };
};

playCard();