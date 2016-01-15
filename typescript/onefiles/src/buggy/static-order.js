var X = (function () {
    function X() {
    }
    X.prototype.say = function () {
        return X.y.say();
    };
    X.y = new Y();
    return X;
})();
var Y = (function () {
    function Y() {
    }
    Y.prototype.say = function () {
        console.log("hai");
    };
    return Y;
})();
