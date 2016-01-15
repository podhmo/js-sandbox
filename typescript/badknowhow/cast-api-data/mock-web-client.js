/// <reference path="./mock-web-api.d.ts" />
var Person = (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.description = function () {
        return this.name + "(" + this.age + ")";
    };
    return Person;
})();
exports.Person = Person;
var mock = require("./mock-web-api");
var person = mock.API();
console.log(person.description());
// TypeError: person.description is not a function 
