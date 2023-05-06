let value = [0,1,2,3,4,5,6,7,8,9];
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

// kartlari oyunculara dagit
let players = [[],[],[],[]];
for(let i = 0; i < 7; i++){
    for(let j = 0; j < 4; j++){
        players[j].push(deck.pop());
    }
}

let table = [];
table.push(deck.pop());


