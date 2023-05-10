let value = ["0","1","2","3","4","5","6","7","8","9"];
let colors = ['green', 'red', 'darkorange', 'dodgerblue'];
let deck = [];
let table = [];

let turn = 7000;
let direction = 1;

const players = [];
const cpu = [];

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
    for (let j = 0 ; j < 4 ; j ++) {

        let playerCards = [];
        for (let i = 0 ; i < 7 ; i++) {
            playerCards.push(deck.pop());
        }

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

    // destede ki 0. indexteki karti tuttuk (burada sanki bi hata var bakicam)
    let carta = deck[1];

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


const deckShow = document.querySelector('.deck');
deckShow.addEventListener('click', function(e){
    const element = e.target;
    console.log(element)
});

const play = document.querySelector('#cardsContainer');

play.addEventListener('click',function(e){
    let lastCardOnTable = table[table.length - 1];

    let playerCardColors = [];
    
    for(let i of players[0]){
        playerCardColors += i.color + ",";
    }
    // playerCardsArray karsilastirmam gereken renkler
    let playerColorArray = playerCardColors.split(",");
    playerColorArray.pop();

    let playerCardValues = [];
    for(let i of players[0]){
        playerCardValues += i.value + ","
    }
    let playerValueArray = playerCardValues.split(",");
    playerValueArray.pop();
    console.log(playerValueArray)

    // index'i yakalatmam gerekiyor sonra o yakalattigim indexe gore karsilastirmam gerekiyor sanirim


    for(let i = 0; i < playerValueArray.lengt; i++)
    if(lastCardOnTable.value == playerValueArray){
        console.log("bu kart atılcak")
    }

    
    
});



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
            <span class="centerNumberBg">${carta.value}</span>
            <span style="color:${carta.color};" class="centerNumber">${carta.value}</span>
        </div>
    `

    numCards = tableCardObject.children.length;
    if(numCards == 6) tableCardObject.children[0].remove();
    
};
renderTable()

// kullanicilarin eline kartlari dagitiyoruz
function renderUserCards() {
    let cardsContainer = document.querySelector('#cardsContainer');
    let cpuTwo = document.querySelector('#player-2');
    let cpuThree = document.querySelector('#player-3');
    let cpuFour = document.querySelector('#player-4');
    cardsContainer.innerHTML = "";
    cpu.innerHTML = "";

    for(let carta of players[0]) {
        cardsContainer.innerHTML += `
            <div style="background-color: ${carta.color};" class="card"">
                <span class="topNumber">${carta.value}</span>
                <span class="underNumber">${carta.value}</span>
                <span class="centerNumberBg">${carta.value}</span>
                <span style="color:${carta.color};" class="centerNumber">${carta.value}</span>
            </div>
        `;
    };

    for(let carta of players[1]) {
        cpuTwo.innerHTML += `
        <div style="background-color: ${carta.color};" class="card"">
            <span class="topNumber">${carta.value}</span>
            <span class="underNumber">${carta.value}</span>
            <span class="centerNumberBg">${carta.value}</span>
            <span style="color:${carta.color};" class="centerNumber">${carta.value}</span>
        </div>
        `;
    };

    for(let carta of players[2]) {
        cpuThree.innerHTML += `
        <div style="background-color: ${carta.color};" class="card"">
            <span class="topNumber">${carta.value}</span>
            <span class="underNumber">${carta.value}</span>
            <span class="centerNumberBg">${carta.value}</span>
            <span style="color:${carta.color};" class="centerNumber">${carta.value}</span>
        </div>
        `;
    };

    for(let carta of players[3]) {
        cpuFour.innerHTML += `
        <div style="background-color: ${carta.color};" class="card"">
            <span class="topNumber">${carta.value}</span>
            <span class="underNumber">${carta.value}</span>
            <span class="centerNumberBg">${carta.value}</span>
            <span style="color:${carta.color};" class="centerNumber">${carta.value}</span>
        </div>
        `;
    };
};
renderUserCards();

console.clear()

/*
// desteki karti oyuncuya cekmek icin
function takeCard() {
    let takenCard = [];

    takenCard.push(deck[0]);
    players[0].push(deck[0]);
    deck.shift();

    return takenCard[0];
}
takeCard();
*/



//#region 
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
//#endregion