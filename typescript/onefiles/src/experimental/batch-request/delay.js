"use strict";
function delay(thunk, waitTime) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(thunk());
        }, waitTime);
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = delay;
