"use strict";
// timeout
const process = require("process");
const pu = require("./promise-util");

function inc(x) {
  return x + 1;
}

function withTimeout(fn, n) {
  return (x) => {
    const sentinel = {};
    const p = Promise.resolve(x);
    return Promise.race([p.then(fn), p.then(pu.toAsync(() => sentinel, n))]).then((v) => {
      if (v === sentinel) {
        throw new Error(`timeout: ${n}`);
      } else {
        return v;
      }
    });
  };
}

// simplify
function withTimeout2(fn, n) {
  return (x) => {
    const p = Promise.resolve(x);
    const timeoutP = p.then(pu.toAsync(() => { throw new Error(`timeout: ${n}`); }, n));
    return Promise.race([p.then(fn), timeoutP]);
  };
}

// ok
const st = process.hrtime();
(() => {
  console.log(`* start: ${process.hrtime(st)}`);
  const incAPI = withTimeout2(pu.toAsync(inc, 500), 700);
  const p = Promise.resolve(1)
        .then(incAPI)
  ;
  pu.displayPromise(p.then((v) => {
    console.log(`* end: ${process.hrtime(st)}`);
    return v;
  }));
})();

// timeout
(() => {
  console.log(`** start: ${process.hrtime(st)}`);
  const incAPI = withTimeout2(pu.toAsync(inc, 500), 300);
  const p = Promise.resolve(1)
        .then(incAPI)
  ;
  pu.displayPromise(p.then((v) => {
    console.log(`** end: ${process.hrtime(st)}`);
    return v;
  }, (v) => {
    console.log(`** end: ${process.hrtime(st)}`);
    return Promise.reject(v);
  }));
})();
