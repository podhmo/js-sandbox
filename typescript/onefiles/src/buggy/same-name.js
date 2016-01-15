var Person = (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.say = function () { console.log(this.name + "(" + this.age + ")"); };
    return Person;
})();
var Hito = (function () {
    function Hito(name, age) {
        this.name = name;
        this.age = age;
    }
    Hito.prototype.say = function () { console.log(this.name + "(" + this.age + ")"); };
    return Hito;
})();
var Hito2 = (function () {
    function Hito2(name, age) {
        this.name = name;
        this.age = age;
    }
    Hito2.prototype.say = function () { console.log(this.name + "(" + this.age + ")"); };
    return Hito2;
})();
function show(p) {
    console.log(p.name + "(" + p.age + ")");
}
function show2(p) {
    p.say();
}
show(new Hito("foo", 10));
// show(new Hito2("foo", 10)); // error
show2(new Hito("foo", 10));
// show2(new Hito2("foo", 10)); // error
