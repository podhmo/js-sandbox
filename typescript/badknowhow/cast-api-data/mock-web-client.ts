/// <reference path="./mock-web-api.d.ts" />

export class Person {
  constructor(public name: string, public age: number) {}
  description(): string {
    return `${this.name}(${this.age})`;
  }
}

var mock: mock.IMockStatic = require("./mock-web-api");
const person = mock.API<Person>();
console.log(person.description());

// TypeError: person.description is not a function