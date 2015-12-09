class Greeter {
    greeting: string;

    constructor(message: string){
        this.greeting = message
    }

    greet(){
        return `Hello ${this.greeting}`;
    }
}

var greeter = new Greeter("world")
console.log(greeter.greet());



// inheritance
class Animal{
    name: String;
    constructor(theName: string){
        this.name = theName;
    }

    move(meters: number = 0){
        console.log(`${this.name} moved ${meters}m.`);
    }
}

class Snake extends Animal{
    constructor(name: string){
        super(name);
    }

    move(meters: number = 5){
        console.log("Slithering...");
        super.move(meters);
    }
}

class Horse extends Animal{
    move(meters = 45){
        console.log("Galloping...");
        super.move(meters);
    }
}

var sam = new Snake("Sammy the Python");
var tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);


// Understanding private
class Animal2 {
    private name:string;
    constructor(theName: string){
        this.name = theName;
    }
}

class Employee {
    constructor(private name: string){
    }
}

var animal : Animal2;
animal = new Animal2("Goat");
var employee = new Employee("Bob");
// animal = employee; //error: Animal and Employee are not compatible
// if name property is public, then, above code is ok.



// Accessors
var passcode = "secret passcode";

class Employee3 {
    constructor(private _fullName){
    }

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string){
        if(passcode && passcode == "secret passcode"){
            this._fullName = newName;
        }else{
            throw new Error("Error: Unauthorized update of employee!");
        }
    }
}

var employee3 = new Employee3("x");
employee3.fullName = "Bob Smith";
console.log(employee3.fullName);


// Static properties

class Grid{
    static origin = {x: 0, y: 0};

    calculateDistanceFromOrigin(point: {x: number; y: number}){
        var xDist = (point.x - Grid.origin.x);
        var yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }

    constructor(public scale: number){
    }
}

var grid1 = new Grid(1.0);  // 1x scale
var grid2 = new Grid(5.0);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));



// Using a class as an interface.

class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

var point3d: Point3d = {x: 1, y: 2, z: 3};