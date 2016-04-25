// OptionType(minimal version)
"use strict";
var SomeImpl = (function () {
    function SomeImpl(value) {
        this.value = value;
    }
    SomeImpl.prototype.get = function () {
        return this.value;
    };
    SomeImpl.prototype.getOrElse = function (value) {
        return this.value || value;
    };
    SomeImpl.prototype.isEmpty = function () {
        return !this.value;
    };
    SomeImpl.prototype.fmap = function (f) {
        return new SomeImpl(f(this.value));
    };
    SomeImpl.prototype.bind = function (f) {
        return f(this.value);
    };
    return SomeImpl;
}());
// 本当はsingletonで良いはず
var NoneImpl = (function () {
    function NoneImpl() {
    }
    NoneImpl.prototype.get = function () {
        throw new Error("invalid caller");
    };
    NoneImpl.prototype.getOrElse = function (value) {
        return value;
    };
    NoneImpl.prototype.isEmpty = function () {
        return true;
    };
    NoneImpl.prototype.fmap = function (f) {
        return this;
    };
    NoneImpl.prototype.bind = function (f) {
        return this;
    };
    return NoneImpl;
}());
function unit(value) {
    return new SomeImpl(value);
}
exports.unit = unit;
function zero() {
    return new NoneImpl();
}
exports.zero = zero;
