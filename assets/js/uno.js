let value = ["0","1","2","3","4","5","6","7","8","9"];
let colors = ['Green', 'Red', 'Yellow', 'Blue'];
let deck = [];

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
let players = [[],[],[],[]];
for(let i = 0; i < 7; i++){
    for(let j = 0; j < 4; j++){
        players[j].push(deck.pop());
    }
}

let table = [];
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