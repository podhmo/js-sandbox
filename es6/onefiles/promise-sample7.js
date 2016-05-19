'use strict';

class Counter {
  constructor() {
    this.i = 0;
  }
  count(){
    this.i++;
    return this.i;
  }
}

const c = new Counter();
function dummyAPI(d){
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: c.count()
      });
    }, d);
  });
}

const cache = {};
function cachedAPI(d,k){
  if (!!cache[k]) {
    return cache[k];
  }
  return cache[k] = dummyAPI(d);
}

Promise.all([dummyAPI(100), dummyAPI(100)])
  .then((xs) => {
    console.log(`dummy -- left: ${JSON.stringify(xs[0])}, right: ${JSON.stringify(xs[1])}`);
  })
  .catch((x) => console.log(x))
;

Promise.all([cachedAPI(100), cachedAPI(100)])
  .then((xs) => {
    console.log(`cache -- left: ${JSON.stringify(xs[0])}, right: ${JSON.stringify(xs[1])}`);
  })
  .catch((x) => console.log(x))
;

const u = new Counter();
function cachedConvertedAPI(d,k){
  return cachedAPI(d, k).then((d) => {
    return {
      updated: u.count(),
      id: d.id
    };
  });
}

Promise.all([cachedConvertedAPI(100), cachedConvertedAPI(100)])
  .then((xs) => {
    console.log(`cached converted -- left: ${JSON.stringify(xs[0])}, right: ${JSON.stringify(xs[1])}`);
  })
  .catch((x) => console.log(x))
;
