// Best common type

class Animal{
}
class Rhino extends Animal {
}
class Elephant extends Animal {
}
class Snake extends Animal {
}

var zoo = [new Rhino(), new Elephant(), new Snake()];
// is equvalent to.
// var zoo: Animal[] = [new Rhino(), new Elephant(), new Snake()];



// Type Compatibility
interface Named {
    name: string;
}

class Person {
    name: string;
}

var p: Named;
p = new Person(); // OK, because of structural typing



var named: Named;
var named2 = {name: "Alice", location: "Seattle"};
named = named2;

function greet(n: Named){
    return `Hello, ${n.name}`;
}

console.log(greet(named2));



// Comparing two functions
var X = (a: number) => 0
var Y = (a: number, b: number) => 0

Y = X; // OK
// X = Y; // Error

/*
Array.prototype.forEach :: (element, index) => void.
but usually using such as -- [1, 2, 3].forEach((i) => console.log(i))
*/
var items = [1, 2, 3];

// Don't force these extra arguments
items.forEach((item, index, array) => console.log(item));

// Should be OK!
items.forEach((item) => console.log(item));



// Function Argument Bivariance

enum EventType { Mouse, Keyboard }

interface Event { timestamp: number; }
interface MouseEvent extends Event { x: number; y: number }
interface KeyEvent extends Event { keyCode: number }

function listenEvent(eventType: EventType, handler: (n: Event) => void) {
    /* ... */
}

// Unsound, but useful and common
listenEvent(EventType.Mouse, (e: MouseEvent) => console.log(`${e.x}, ${e.y}`));

// Undesirable alternatives in presence of soundness
listenEvent(EventType.Mouse, (e: Event) => console.log((<MouseEvent>e).x + ',' + (<MouseEvent>e).y));
listenEvent(EventType.Mouse, <(e: Event) => void>((e: MouseEvent) => console.log(e.x + ',' + e.y)));

// Still disallowed (clear error). Type safety enforced for wholly incompatible types
// listenEvent(EventType.Mouse, (e: number) => console.log(e));