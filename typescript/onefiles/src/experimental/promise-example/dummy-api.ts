/// <reference path="./promise.d.ts"/>

interface PromiseFn<A, B> {
  (a: A): B | Thenable<B>;
}

class FakePromiseModule {
  constructor(
    public log: (s: string) => void
  ) {}

  toFakeAsync<A, B>(fn: PromiseFn<A, B>, d: number): (a: A)  => Promise<B> {
    return (x: A) => {
      return new Promise<A>((resolve: Function) => {
        this.log(`\twait: ${d}`);
        setTimeout(() => {
          resolve(x);
        }, d);
      }).then(fn);
    };
  }

   toFragile<A, B>(fn: PromiseFn<A, B>, n: number): (a: A)  => Promise<B> {
    return (x: A) => {
      return new Promise<A>((resolve: Function, reject: Function) => {
        const r = Math.random();
        this.log(`\tfragile: broken when (${n} > ${r} = ${n > r})`);
        if (n > r) {
          reject(x);
        } else {
          resolve(x);
        }
      }).then(fn);
    };
  }

  display(p: Promise<any>) {
    return p.then((v: any) => {
      this.log(`ok: ${JSON.stringify(v, null, 2)}`);
    return v;
  }, (err: any) => {
    this.log(`ng: ${JSON.stringify(err, null, 2)}`);
    throw err;
  });
  }
}

function inc(x: number) {
  return x + 1;
}

const m = new FakePromiseModule((s: string) => {
  console.log(`*: ${s}`);
});

m.display(Promise.resolve(1));

(() => {
  const m = new FakePromiseModule((s: string) => {
    console.log(`**: ${s}`);
  });

  const incAPI = m.toFakeAsync(inc, 100);
  const p = Promise.resolve(1)
    .then(incAPI)
    .then(incAPI)
    .then(incAPI)
    .then(incAPI)
    .then(incAPI)
  ;
  m.display(p);
})();

(() => {
  const m = new FakePromiseModule((s: string) => {
    console.log(`***: ${s}`);
  });

  const incAPI = m.toFakeAsync(m.toFragile(inc, 0.3), 100);
  const p = Promise.resolve(1)
    .then(incAPI)
    .then(incAPI)
    .then(incAPI)
    .then(incAPI)
    .then(incAPI)
  ;
  m.display(p);
})();

