var U = (function () {
    function U() {
    }
    U.prototype.s = function () {
        return 'hello';
    };
    return U;
}());
console.log(new U().s());
