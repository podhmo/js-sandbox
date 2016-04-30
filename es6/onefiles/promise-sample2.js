'use strict';

// normal calculation
function inc(x) {
  return x + 1;
}

// to async calculation combinator
function toAsync(fn, d) {
  return (x) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve(x);
      });
    }).then(fn);
  };
}

function toFragile(fn, fragileP){
  return (x) => {
    return new Promise((resolve, reject) => {
      return fragileP(x) ? reject(x) : resolve(x);
    }).then(fn);
  };
}

function toRandomFragile(fn, n) {
  return toFragile(fn, () => {
    return Math.random() > n;
  });
}

// logging
function tick(st) {
  return (x) => {
    console.log(`tick: ${process.hrtime(st)} -- ${x}`);
    return x;
  };
}
function withTick(fn, tickFn) {
  return (x) => {
    return fn(tickFn(x));
  };
}

function displayPromise(p) {
  return p.then((v) => {
    console.log(`\
----------------------------------------
ok: ${JSON.stringify(v, null, 2)}
----------------------------------------`);
    return v;
  }, (err) => {
console.log(`\
----------------------------------------
ng: ${JSON.stringify(err, null, 2)}
----------------------------------------`);
    throw err;
  });
}

const st = process.hrtime();
const incAPI = toAsync(withTick(toRandomFragile(inc, 0.7), tick(st)), 100);


const p = Promise
  .resolve(1)
  .then(incAPI)
  .then(incAPI)
  .then(incAPI)
  .then(incAPI)
;

displayPromise(p);
