let value = ["0","1","2","3","4","5","6","7","8","9"];
let colors = ['green', 'red', 'darkorange', 'dodgerblue'];
let deck = [];
let table = [];

let turn = 7000;
let direction = 1;

const players = [];

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

/*
function organizeCards(playerCards) {

    let organizedCards = [];

    for( let color of ['black'].concat(colors) ) {
        let filteredCards = playerCards.filter( e => e.color == color );
        organizedCards = organizedCards.concat(filteredCards.sort((a,b) => {
            if (a.value > b.value) return 1;
            if (a.value < b.value) return -1;
            return 0;
        }));
    };
    return organizedCards;
};
organizeCards()
*/

// ortaya ilk koyulan karti ayarlandi
function startTable(){
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

// // ortada cekilecek kartlar 
// function renderDeck() {
//     let deckObject = document.querySelector('#deck');

//     let valueHTML;

//     let carta = deck[0];

//     valueHTML = `<span>${carta.value}</span>`;

//     deckObject.innerHTML = `
//         <div class="card" style="background-color: ${carta.color};">
//             <span class="topNumber">${valueHTML}</span>
//             <span class="underNumber">${valueHTML}</span>
//             <span class="centerNumber">${valueHTML}</span>
//         </div>
//     `
// }
// renderDeck()

// ortaya atilan kartlar
function renderTable() {
    let tableCardObject = document.querySelector('#table');
    let numCards = tableCardObject.children.length;
    
    let carta = table[table.length - 1];

    let angle;
    angle = (Math.random() - 0.5 * 2 *15);

    let valueHTML;
    valueHTML = `<span>${carta.value}</span>`;

    tableCardObject.innerHTML += `
        <div style="background-color: ${carta.color}; transform: rotateZ(${angle}deg);" class="card">
            <span class="topNumber">${valueHTML}</span>
            <span class="underNumber">${valueHTML}</span>
            <span class="centerNumber">${valueHTML}</span>
        </div>
    `

    numCards = tableCardObject.children.length;
    if(numCards == 6) tableCardObject.children[0].remove();
    
};
renderTable()

function sortCardsOnContainer(){
    let container = document.querySelector(".cards-container");
    let cards = [...container.children];

    if(players[0].length == 0) return;

    let numCards = cards.length;
    let cardWidth = 110;

    let containerWidth = container.clientWidth;
    let windowWidth = window.innerHeight;

    let desiredWidth = numCards*cardWidth - 8 * (numCards-3);

    if ( desiredWidth <= windowWidth && desiredWidth <= containerWidth ) return;

    let offset;

    if ( desiredWidth >  windowWidth) {
        offset = ( cards.length * cardWidth - windowWidth ) / ( cards.length - 3 );
    } else {
        offset = 8;
    }
    cards[0].style.marginLeft = `0px`;
    for (let i = 1; i < cards.length; i++) {
        cards[i].style.marginLeft = `-${offset}px`;
    };
};
sortCardsOnContainer();

function renderUserCards() {
    let cardsContainer = document.querySelector('#cardsContainer');
    cardsContainer.innerHTML = "";

    for(let carta of players[0]) {
        let valueHTML;

        valueHTML = `${carta.value}`;

        cardsContainer.innerHTML += `
            <div style="background-color: ${carta.color};" class="card" onclick="handleClick(this)">
                <span class="topNumber">${valueHTML}</span>
                <span class="underNumber">${valueHTML}</span>
                <span class="centerNumber">${valueHTML}</span>
            </div>
        `;
    };
};
renderUserCards();


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



let player1 = document.querySelector("#player1");
let player2 = document.querySelector("#player2");
let player3 = document.querySelector("#player3");
let player4 = document.querySelector("#player4");

player1 = players[0];
player2 = players[1];
player3 = players[2];
player4 = players[3];

let logo = document.querySelector('.logo');
// for(let a of player1) {
//     logo.innerHTML += a.value
//     console.log(a)
// }

// shuffleCards();
*/