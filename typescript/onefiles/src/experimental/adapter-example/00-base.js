"use strict";
var Parent = (function () {
    function Parent(child) {
        this.child = child;
    }
    Parent.prototype.create = function (name, age) {
        if (age === void 0) { age = 0; }
        this.child = new Child(name, age);
        return this.child;
    };
    Parent.prototype.rename = function (name) {
        this.child.name = name;
        return this.child;
    };
    Parent.prototype.delete = function () {
        delete this.child;
    };
    return Parent;
}());
exports.Parent = Parent;
var Child = (function () {
    function Child(name, age) {
        if (age === void 0) { age = 0; }
        this.name = name;
        this.age = age;
    }
    return Child;
}());
exports.Child = Child;
var ChildDisplay = (function () {
    function ChildDisplay(child) {
        this.child = child;
    }
    ChildDisplay.prototype.display = function () {
        console.log("child: '" + this.child.name + "(" + this.child.age + ")'");
    };
    return ChildDisplay;
}());
exports.ChildDisplay = ChildDisplay;
