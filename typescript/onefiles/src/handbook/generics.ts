function identity(arg: number){
    return arg;
}

function identity2(arg: any){
    return arg;
}

function identity3<T>(arg: T): T{
    return arg;
}

var output = identity3<string>("myString")  // type of output will be 'string'


// Working with Generic Type Variables

function loggingIdentity<T>(arg: T[]): T[]{
    console.log(arg.length); // Array has a .length, so no more error
    return arg;
}

function loggingIdentity2<T>(arg: Array<T>): Array<T>{
    console.log(arg.length);
    return arg;
}


// Generic Types

function identity4<T>(arg: T): T{
    return arg;
}

var myIdentity: <T>(arg: T)=>T = identity4;
var myIdentity2: <U>(arg: U)=>U = identity4;
var myIdentity3: {<T>(arg: T): T} = identity4;


interface GenericIdentityFn {
        <T>(arg: T): T;
}
interface GenericIdentityFn2<T> {
    (arg: T): T;
}

var myIdentity4: GenericIdentityFn = identity4;
var myIdentity5: GenericIdentityFn2<number> = identity4;



// Generic Classes
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

var myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y){return x + y;};


var stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function(x, y){return x + y;};

console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));

// class has two side to its type: the static side and the instance side. Generic classes are only generic over their instance side rather than their static side, so when working with classes, static members can not use the class's type paramameter.



// Generic Constraints
interface Lengthwise {
    length: number;
}


function loggingIdentity3<T extends Lengthwise>(arg: T): T{
    console.log(arg.length);
    return arg;
}

console.log(loggingIdentity3([]));
// console.log(loggingIdentity3(10)); // error



// Using Class Types in Generics
function create<T>(c: {new(): T;}): T{
    return new c();
}

class BeeKeeper{
    hasMask: boolean;
}

class ZooKeeper{
    nametag: string;
}

class Animal{
    name: string;
}

class Bee extends Animal{
    keeper: BeeKeeper;
}

class Lion extends Animal{
    keeper: ZooKeeper;
}


function findKeeper<A extends Animal, K>(a: {new(): A; prototype: {keeper: K}}): K {
    return a.prototype.keeper;
}

console.log(findKeeper<Lion, ZooKeeper>(Lion)); // typechecks!
console.log(findKeeper(Lion)); // typechecks!

// *TODO* but this function calling, return `undefined` isn't it?
