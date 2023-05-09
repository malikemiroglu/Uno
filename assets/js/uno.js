let value = ["0","1","2","3","4","5","6","7","8","9"];
let colors = ['green', 'red', 'darkorange', 'dodgerblue'];
let deck = [];
let table = [];

let turn = 7000;
let direction = 1;

const players = [];
const gpu = [];

//kartlari desteye koyduk
function createCards() {
    for(let color of colors){
        for(let i = 0; i < value.length; i++) {

            let card = {color: color, value: value[i]};
            deck.push(card);
        };
    };
};
createCards();

//kartlari karistirdik
function shuffleCards() {
    deck.sort(() => Math.random() - 0.5);
};
shuffleCards();

console.log(deck)

// kartlari oyunculara dagitiyoruz
function giveCardsToPlayer() {

    for (let j = 0 ; j < 2 ; j ++) {

        let playerCards = [];
        for (let i = 0 ; i < 7 ; i++) {
            playerCards.push(deck.pop());
        }
        // playerCards = organizeCards(playerCards);
        players.push(playerCards);
    };
};
giveCardsToPlayer()
console.log(players)
console.log(deck)


// ortaya ilk koyulan karti ayarlandi
function startTable() {
    for(let i = 0; i < deck.length; i++) {
        if(!isNaN(parseInt(deck[i].value))) {
            table.push(deck[i]);
            deck.splice(i,1);
            return;
        };
    };
};
startTable();
console.log(table)
console.log(deck)

// ortada cekilecek kartlar 
function renderDeck() {
    let deckObject = document.querySelector('#deck');

    // destede ki 0. indexteki karti tuttuk
    let carta = deck[0];
    console.log(carta)

    deckObject.innerHTML = `
        <div class="card cardBackground">
                
        </div>

        <div class="card frente" style="background-color: ${carta.color};">
            <span class="topNumber">${carta.value}</span>
            <span class="underNumber">${carta.value}</span>
            <span class="centerNumber">${carta.value}</span>
        </div>
    `
};
renderDeck();

// ortaya atilan kartlar
function renderTable() {
    let tableCardObject = document.querySelector('#table');
    let numCards = tableCardObject.children.length;
    
    let carta = table[table.length - 1];
    console.log(carta)

    let angle = (Math.random() * -15);
    console.log(angle)

    tableCardObject.innerHTML += `
        <div style="background-color: ${carta.color}; transform: rotateZ(${angle}deg);" class="card">
            <span class="topNumber">${carta.value}</span>
            <span class="underNumber">${carta.value}</span>
            <span class="centerNumber">${carta.value}</span>
        </div>
    `

    numCards = tableCardObject.children.length;
    if(numCards == 6) tableCardObject.children[0].remove();
    
};
renderTable()

function renderUserCards() {
    let cardsContainer = document.querySelector('#cardsContainer');
    cardsContainer.innerHTML = "";

    for(let carta of players[0]) {
        cardsContainer.innerHTML += `
            <div style="background-color: ${carta.color};" class="card" onclick="handleClick(this)">
                <span class="topNumber">${carta.value}</span>
                <span class="underNumber">${carta.value}</span>
                <span class="centerNumber">${carta.value}</span>
            </div>
        `;
    };
};
renderUserCards();

// desteki karti oyuncuya cekmek icin
function takeCard() {
    let takenCard = [];

    takenCard.push(deck[0]);
    players[0].push(deck[0]);
    deck.shift();

    return takenCard[0];
}
takeCard();





/*
// kartlari karistirip desteye dagit
for(let i = 0; i < colors.length; i++){
    for(let j = 0; j < value.length; j++){
        let cards = {value: value[j], color: colors[i]};
        deck.push(cards);
    };
};

// kartlari karistir
let shuffleDeck = deck.sort(function() {
    return Math.random() - 0.5
});
// function shuffleCards() {
//     deck.sort(() => Math.random() - 0.5 );
// }
// kartlari oyunculara dagit
let playerss = [[],[],[],[]];
for(let i = 0; i < 7; i++){
    for(let j = 0; j < 4; j++){
        playerss[j].push(deck.pop());
    }
}

table.push(deck.pop());

*/