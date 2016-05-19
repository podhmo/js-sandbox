'use strict';
const pu = require('./promise-util');

function inc(x) {
  return x + 1;
}
const incD = pu.toAsync(inc, 100);

const p = Promise.resolve(1)
  .then(incD)
  .then(incD)
  .then(incD)
  .then(incD)
  .then(incD)
  .then(incD)
;
pu.displayPromise(p);

const q = Promise.resolve(1)
      .then((x) => {
        return incD(x).then((x) => {
          return incD(x).then((x) => {
            return incD(x).then((x) => {
              return incD(x).then((x) => {
                return incD(x).then((x) => {
                  return incD(x);
                });
              });
            });
          });
        });
      })
;
pu.displayPromise(q);
