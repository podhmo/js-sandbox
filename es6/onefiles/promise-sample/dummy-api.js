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

class DummyAPIFactory {
  constructor() {
    this.c = new Counter();
    this.apiNameCounter = new Counter();
  }
  mergeAPI(d) {
    const name = `merge${this.apiNameCounter.count()}`;
    return (k, vs) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: k,
            result: this.c.count(),
            api: name,
            history: vs.map((x) => [x.result].concat(x.history || []))
          });
        }, d);
      });
    };
  }
  dummyAPI(d) {
    const name = `api${this.apiNameCounter.count()}`;
    return (k, v) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: k,
            result: this.c.count(),
            api: name,
            history: v ? (v.history || []).concat([v.result]) : []
          });
        }, d);
      });
    };
  }
  cachedAPI(api) {
    let cache = {};
    return (k, v) => {
      let p = cache[k];
      if (!!p) {
        return p;
      }
      p = cache[k] = api(k, v);
      return p;
    };
  }
  // bad
  badCachedAPI(api) {
    let cache = {};
    return (k, v) => {
      let r = cache[k];
      if (!!r) {
        return Promise.resolve(r);
      }
      return api(k, v).then((data) => {
        cache[k] = data;
        return data;
      });
    };
  }
}

module.exports = {
  Counter: Counter,
  DummyAPIFactory: DummyAPIFactory
};

