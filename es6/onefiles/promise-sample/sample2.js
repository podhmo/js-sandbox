'use strict';

// normal calculation
function inc(x) {
  return x + 1;
}

const pu = require('./promise-util');

const st = process.hrtime();
const incAPI = pu.toAsync(pu.withTick(pu.toRandomFragile(inc, 0.7), pu.tick(st)), 100);
const incAPIRetry5 = pu.withRetry(incAPI, (doRetry, i, err) => {
  console.log(`\tretry ${i}: ${JSON.stringify(err)}`);
  if (i < 5) {
    return doRetry();
  }
});


(() => {
  const p = Promise.resolve(1)
        .then(incAPIRetry5)
        .then(incAPIRetry5)
        .then(incAPIRetry5)
        .then(incAPIRetry5)
  ;
  pu.displayPromise(p);
})();
