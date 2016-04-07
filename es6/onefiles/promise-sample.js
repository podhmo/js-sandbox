'use strict';

function inc(i) {
  return i + 1;
}

function err(i) {
  throw new Error(i);
}

const p = new Promise((resolve) => {
  resolve(0);
});

const one = p.then(inc);

one.then(inc)
  .then(inc)
  .then(inc)
  .then(inc)
  .then((i) => {
    console.log(i);
  });

one.then(inc)
  .then(inc)
  .then(inc)
  .then(err)
  .then(inc)
  .then((i) => {
    console.log(i);
  })
  .catch((e) => {
    console.log(e);
  })
    ;
