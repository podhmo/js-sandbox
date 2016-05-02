'use strict';
const pu = require('./promise-util');

class Q {
  constructor(fns) {
    this.fns = fns || [];
  }
  add(n, fn) {
    return new Q(this.fns.concat([[n, fn]]));
  }
}
class ProgressState {
  constructor(value, current, end, q) {
    this.value = value;
    this.current = current;
    this.end = end;
    this.q = q || new Q();
  }

  plan(n, fn) {
    return new ProgressState(this.value, this.current, this.end + n, this.q.add(n, fn));
  }
  createNotify() {
    return (fn) => {
      return fn(this.value, this.current, this.end);
    };
  }
  consume(useNotify) {
    let w = new ProgressState(this.value, this.current, this.end);
    useNotify(w.createNotify());
    let p = Promise.resolve(w);
    this.q.fns.forEach((pair) => {
      const n = pair[0];
      const f = pair[1];
      p = p.then((w) => {
        return Promise.resolve(w.value).then(f).then((v) => {
          w.value = v;
          w.current += n;
          return w;
        });
      });
    });
    return p.then((w) => {
      return w.value;
    });
  }
}
ProgressState.create = (value) => {
  return new ProgressState(value, 0, 0);
};

function inc(v) {
  return v.concat([v.length + 1]);
  // return v.concat([(Math.ceil(Math.random() * 10))]);
}
function withProgress(fn, n) {
  return (w) => {
    return w.plan(n, fn);
  };
}
const incAPI = pu.toAsync(inc, () => {
  return Math.floor(Math.random() * 100);
});

let notifiers = [];
const p = Promise.resolve(ProgressState.create([]))
      .then(withProgress(incAPI, 1))
      .then(withProgress(incAPI, 1))
;
function stars(n, max) {
  let arr = [];
  for (let i = 0; i < max; i++) {
    arr.push(i <= n ? "*" : ".");
  }
  return arr.join("");
}
pu.displayPromise(p
  .then(withProgress(incAPI, 1))
  .then(withProgress(incAPI, 1))
  .then(withProgress(incAPI, 1))
  .then((w) => {
    return w.consume((notify) => {
      notifiers.push(() => {
        notify((v, i, max) => {
          console.log(`   * [${stars(i, max)}] -- current ${v}`);
        });
      });
    });
  }))
;
pu.displayPromise(p
  .then(withProgress(incAPI, 1))
  .then(withProgress(incAPI, 1))
  .then(withProgress(incAPI, 1))
  .then((w) => {
    return w.consume((notify) => {
      notifiers.push(() => {
        notify((v, i, max) => {
          console.log(`  ** [${stars(i, max)}] -- current ${v}`);
        });
      });
    });
  }))
;
pu.displayPromise(p
  .then(withProgress(incAPI, 1))
  .then(withProgress(incAPI, 1))
  .then(withProgress(incAPI, 1))
  .then((w) => {
    return w.consume((notify) => {
      notifiers.push(() => {
        notify((v, i, max) => {
          console.log(` *** [${stars(i, max)}] -- current ${v}`);
        });
      });
    });
  }))
;
pu.displayPromise(p
  .then(withProgress(incAPI, 1))
  .then(withProgress(incAPI, 1))
  .then(withProgress(incAPI, 1))
  .then((w) => {
    return w.consume((notify) => {
      notifiers.push(() => {
        notify((v, i, max) => {
          console.log(`**** [${stars(i, max)}] -- current ${v}`);
        });
      });
    });
  }))
;

(() => {
  let p = Promise.resolve(null);
  const describe = pu.toAsync(() => {
    console.log("========================================");
    notifiers.forEach((notify) => {
      notify();
    });
  }, 10);
  for (let i = 0; i < 20; i++) {
    p = p.then(describe);
  }
})();
