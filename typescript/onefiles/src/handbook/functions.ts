// Named function
function add(x, y){
    return x + y;
}


// Anonymous function
var myAdd = function(x, y){return x + y;};


// closure
var z = 100;

function addToZ(x, y){
    return x + y + z;
}

console.log(addToZ(10, 1));


// Function Types

function add2(x: number, y: number): number {
    return x + y;
}

var myAdd2 = function(x: number, y:number): number {return x + y};

var myAdd3 : (x:number, y:number) => number = function(x: number, y:number): number {return x + y};


// Optional and Default Parameters

function buildName(firstname: string, lastname?: string){
    if(lastname){
        return `${firstname} ${lastname}`;
    }else{
        return firstname;
    }
}

console.log(buildName("Bob"));
console.log(buildName("Bob", "Adams"));

function buildName2(firstname: string, lastname: string = "Smith"){
    return `${firstname} ${lastname}`;
}

console.log(buildName2("Bob"));
console.log(buildName2("Bob", "Adams"));


// Rest Parameters

function buildName3(firstName: string, ...restOfName: string[]){
    return `${firstName} ${restOfName.join(" ")}`;
}

console.log(buildName3("foo", "bar", "boo"));



// Lambdas and using `this`

var deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function(){
        // Notice: the line below is now a lambda, allowing us to capture 'this' earlier
        return () => {
            var pickedCard = Math.floor(Math.random() * 52);
            var pickedSuit = Math.floor(pickedCard / 13);
            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

var cardPicker = deck.createCardPicker();
var pickedCard = cardPicker();

console.log(`card: ${pickedCard.card} of ${pickedCard.suit}`);


// Overloads
var suits = ["hearts", "spades", "clubs", "diamonds"];

// function pickCard(x): any{
//     if (typeof x == "object"){
//         var pickedCard = Math.floor(Math.random() * x.length);
//         return pickedCard;
//     }else if(typeof x == "number"){
//         var pickedSuit = Math.floor(x / 13);
//         return {suit: suits[pickedSuit], card: x % 13};
//     }
// }
function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        var pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        var pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}
var myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
var pickedCard1 = myDeck[pickCard(myDeck)];
console.log(`card: ${pickedCard1.card} of ${pickedCard1.suit}`);

var pickedCard2 = pickCard(15);
console.log(`card: ${pickedCard2.card} of ${pickedCard2.suit}`);
