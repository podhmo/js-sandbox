// http://www.typescriptlang.org/Handbook#interfaces

// structural subtyping
function printLabel(labeldObj: {label: string}){
    console.log(labeldObj.label);
}

var myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);


// interface
interface LabeldValue {
    label: string
}

function printLabel2(labeledObj: LabeldValue){
    console.log(labeledObj)
}

var myObj = {size: 10, label: "Size 10 Object"};
printLabel2(myObj);


// Optional property
interface SquareConfig{
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): {color: string, area: number}{
    var newSquare = {color: "white", area: 100};
    if (config.color){
        newSquare.color = config.color;
    }
    if (config.width){
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

console.log(createSquare({color: "black"}));


// Function types

interface SearchFunc {
    (source: string, subString: string): boolean
}

var mySearch: SearchFunc;

mySearch = function(source: string, subString: string){
    var result = source.search(subString);
    return result != -1;
}


// Array types

interface StringArray {
    [index: number]: string;
}

var myArray: StringArray;
myArray = ["Bob", "Fred"];



// Class types

interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}

class Clock implements ClockInterface {
    currentTime: Date;

    setTime(d: Date){
        this.currentTime = d;
    }

    constructor(h: number, m: number){
    }
}

interface ClockStatic {
    new (hour: number,  minite: number)
}

var cls: ClockStatic = Clock;
var newClock = new cls(7, 30);


// Extending interface
interface Shape {
    color: string
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

var square = <Square>{}; // what is this?
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;


// Hybrid types
interface Counter {
    (start: number): String;
    interval: number;
    reset(): void;
}

function doAction(c: Counter){
    c(10);
    c.reset();
    c.interval = 5.0
}

