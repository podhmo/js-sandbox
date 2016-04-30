'use strict';

function incD(x){
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x + 1);
    }, 100);
  });
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

const p = Promise.resolve(1)
  .then(incD)
  .then(incD)
  .then(incD)
  .then(incD)
  .then(incD)
  .then(incD)
;
displayPromise(p);

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
displayPromise(q);
