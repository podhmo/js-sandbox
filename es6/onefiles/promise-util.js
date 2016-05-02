'use strict';

// to async calculation combinator
function toAsync(fn, d) {
  return (x) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve(x);
      }, (typeof d === 'function' ? d() : d));
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
    return Math.random() <= n;
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

function withRetry(gen, branch) {
  return (value) => {
    function loop(p, i, errors){
      return p.catch((err) => {
        errors.push(err);
        let q = branch(() => { return gen(value); }, i, err);
        return q !== void 0 ? loop(q, i + 1,  errors) : Promise.reject({value: value, errors: errors});
      });
    }
    const p = Promise.resolve(value).then(gen);
    return loop(p, 1, []);
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

module.exports = {
  toAsync: toAsync,
  toFragile: toFragile,
  toRandomFragile: toRandomFragile,
  tick: tick,
  withTick: withTick,
  withRetry: withRetry,
  displayPromise: displayPromise
};
