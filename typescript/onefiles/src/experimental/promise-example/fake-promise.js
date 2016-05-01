"use strict";
var FakePromiseModule = (function () {
    function FakePromiseModule(log) {
        this.log = log;
    }
    FakePromiseModule.prototype.toFakeAsync = function (fn, d) {
        var _this = this;
        return function (x) {
            return new Promise(function (resolve) {
                _this.log("\twait: " + d);
                setTimeout(function () {
                    resolve(x);
                }, d);
            }).then(fn);
        };
    };
    FakePromiseModule.prototype.toFragile = function (fn, n) {
        var _this = this;
        return function (x) {
            return new Promise(function (resolve, reject) {
                var r = Math.random();
                _this.log("\tfragile: broken when (" + n + " > " + r + " = " + (n > r) + ")");
                if (n > r) {
                    reject(x);
                }
                else {
                    resolve(x);
                }
            }).then(fn);
        };
    };
    FakePromiseModule.prototype.display = function (p) {
        var _this = this;
        return p.then(function (v) {
            _this.log("ok: " + JSON.stringify(v, null, 2));
            return v;
        }, function (err) {
            _this.log("ng: " + JSON.stringify(err, null, 2));
            throw err;
        });
    };
    return FakePromiseModule;
}());
exports.FakePromiseModule = FakePromiseModule;
