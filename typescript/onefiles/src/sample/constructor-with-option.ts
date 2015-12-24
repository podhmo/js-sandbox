class Person {
    constructor(public name: string = "foo"){
    }
}

console.log(new Person().name);
console.log(new Person("boo").name);