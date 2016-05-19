"use strict";
const process = require("process");
const pu = require("./promise-util");

// multi value

function inc(x) {
  return x + 1;
}

function add(x, y) {
  return x + y;
}

function toMulti(fn){
  return (args) => {
    return fn.apply(null, args);
  };
}

(() => {
  const st = process.hrtime();
  console.log(`start: ${process.hrtime(st)}`);
  const p = Promise.resolve(1)
        .then(pu.toAsync(inc,10))
        .then(pu.toAsync(inc,10))
        .then(pu.toAsync(inc,10))
        .then(pu.toAsync(inc,10))
  ;
  pu.displayPromise(p.then((v) => {
    console.log(`end: ${process.hrtime(st)}`);
    return v;
  }));
})();

(() => {
  const st = process.hrtime();
  console.log(`start: ${process.hrtime(st)}`);
  const p = Promise.resolve(1)
        .then(pu.toAsync(inc,10))
        .then(pu.toAsync(inc,10))
        .then(pu.toAsync(inc,10))
        .then(pu.toAsync(inc,10))
  ;
  const q = Promise.all([p, p]).then(pu.toAsync(toMulti(add), 100));
  pu.displayPromise(q.then((v) => {
    console.log(`end: ${process.hrtime(st)}`);
    return v;
  }));
})();
