'use strict';
const pu = require('./promise-util');

class State {
  constructor(value, current, max) {
    this.value = value;
    this.current = current;
    this.max = max;
  }
  plan(n) {
    return new State(this.value, this.current, this.max + n);
  }
  act(value, n) {
    return new State(value, this.current + n, this.max);
  }
}

class Q {
  constructor(parent, fn) {
    this.q = parent ? parent.q : [];
    if (fn) {
      this.q = parent.q.concat([fn]);
    }
  }

  start(c) {
    return this.q.reduce((p, fn) => {
      return p.then(fn);
    }, Promise.resolve(c));
  }
}

// [f, g, g] -> [p f, p g, p h, a f, a g, a h]
class Container {
  constructor(state, q) {
    this.state = state;
    this.q = q;
  }

  plan(n, fn) {
    const wrapped = (c) => {
      const r = fn(c.state.value);
      const p = r.then ? r : Promise.resolve(r);
      return p.then((value) => {
        c.state = c.state.act(value, n);
        return c;
      });
    };
    return new Container(this.state.plan(n), new Q(this.q, wrapped));
  }

  start(useNotify){
    let c = new Container(this.state, this.q);
    useNotify((notify) => {
      return notify(c.state);
    });
    return c.q.start(c).then((c) => {
      return c.state.value;
    });
  }

  notify(fn) {
    return fn(this);
  }
}
Container.create = (value) => {
  return new Container(new State(value, 0, 0), new Q());
};

function inc(v) {
  return v + 1;
}
function withProgress(fn, n) {
  return (w) => {
    return w.plan(n, fn);
  };
}
const incAPI = pu.toAsync(inc, () => {
  return Math.floor(Math.random() * 200);
});

let notifiers = [];
const p = Promise.resolve(Container.create(1))
      .then(withProgress(incAPI, 1))
      .then(withProgress(incAPI, 1))
;
function stars(n, max) {
  let arr = [];
  for (let i = 0; i < max; i++) {
    arr.push(i < n ? "*" : ".");
  }
  return arr.join("");
}

[1, 2, 3, 4].forEach((i) => {
  const q = p
        .then(withProgress(incAPI, 1))
        .then(withProgress(incAPI, 1))
        .then(withProgress(incAPI, 1))
        .then((w) => {
          return w.start((notify) => {
            notifiers.push(() => {
              notify((s) => {
                console.log(`${i}: [${stars(s.current, s.max)}] -- value ${s.value}`);
              });
            });
          });
        })
  ;
  pu.displayPromise(q);
});

(() => {
  let p = Promise.resolve(null);
  const describe = pu.toAsync(() => {
    console.log("========================================");
    notifiers.forEach((notify) => {
      notify();
    });
  }, 30);
  for (let i = 0; i < 20; i++) {
    p = p.then(describe);
  }
})();
