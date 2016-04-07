'use strict';

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
}

console.log(new Person('foo').say('hello'));
console.log(new Person('bar').sayWith("hello")(" world"));
