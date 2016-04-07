'use strict';

class Upper {
  constructor(ob) {
    this.ob = ob;
  }

  say(message) {
    return this.ob.say(message).toUpperCase();
  }
}

class Person {
  constructor(name) {
    this.name = name;
  }

  say(message) {
    return `${this.name}: ${message}`;
  }

  sayWith(message) {
    return (message2) => this.say(message + message2);
  }

  static Upper(name) {
    return new Upper(new Person(name));
  }
}

class UseCase {
  constructor(name) {
    this.name = name;
  }
  get one() {
    return new Person(this.name).say('hello');
  }
  get two() {
    return new Person(this.name).sayWith("hello")(" world");
  }
  get three() {
    return Person.Upper(this.name).say('hello');
  }
}

const usecase = new UseCase('foo');
console.log(usecase.one);
console.log(usecase.two);
console.log(usecase.three);


