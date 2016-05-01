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
    FakePromiseModule.prototype.withRetry = function (gen, branch) {
        return function (value) {
            function loop(p, i, errors) {
                return p.catch(function (err) {
                    errors.push(err);
                    var q = branch(function () { return gen(value); }, i, err);
                    return q !== void 0 ? loop(q, i + 1, errors) : Promise.reject({ value: value, errors: errors });
                });
            }
            var p = Promise.resolve(value).then(gen);
            return loop(p, 1, []);
        };
    };
    FakePromiseModule.prototype.withTick = function (fn) {
        var _this = this;
        return function (x) {
            _this.log("========================================");
            return fn(x);
        };
    };
    FakePromiseModule.prototype.withPeek = function (fn) {
        var _this = this;
        return function (x) {
            _this.log("peek: " + x);
            return fn(x);
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
