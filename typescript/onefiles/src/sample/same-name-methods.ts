class Foo{
    name = "foo";
    say(){return `hai, this is ${this.name}`;}
}
class Bar{
    name = "bar";
    say(){return `bye, this is ${this.name}`;}
}

interface HaveSay{
    say(): string
}
interface HaveName{
    name: string
}

function getInformation(o: HaveSay & HaveName){
    return {
        name: o.name,
        description: o.say()
    };
}

console.log(getInformation(new Foo()));
console.log(getInformation(new Bar()));

// normal

interface ForInformation {
    name: string
    say(): string
}

class Foo2 implements ForInformation{
    name = "foo";
    say(){return `hai, this is ${this.name}`;}
}
class Bar2 implements ForInformation{
    name = "bar";
    say(){return `bye, this is ${this.name}`;}
}

function getInformation2(o: ForInformation){
    return {
        name: o.name,
        description: o.say()
    };
}

console.log(getInformation2(new Foo2()));
console.log(getInformation2(new Bar2()));

// directly

function getInformation3(o : {name: string, say: () => string}){
    return {
        name: o.name,
        description: o.say()
    };
}

console.log(getInformation3(new Foo()));

class Foo3 {
    name = "foo";
    getFullName(){ return "Foo";}
    say(){return `hai, this is ${this.name}`;}
}

function getInformation4(o: ({getFullName: () => string, say: () => string} | {name: string,  say: () => string})){
}