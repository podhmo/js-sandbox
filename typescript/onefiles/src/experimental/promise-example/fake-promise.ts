export interface PromiseFn<A, B> {
  (a: A): B | Promise<B>;
}

export class FakePromiseModule {
  constructor(
    public log: (s: string) => void
  ) {}

  toFakeAsync<A, B>(fn: PromiseFn<A, B>, d: number): (a: A) => Promise<B> {
    return (x: A) => {
      return new Promise<A>((resolve: Function) => {
        this.log(`\twait: ${d}`);
        setTimeout(() => {
          resolve(x);
        }, d);
      }).then(fn);
    };
  }

   toFragile<A, B>(fn: PromiseFn<A, B>, n: number): (a: A) => Promise<B> {
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

  withRetry<A, B>(gen: (a: A) => Promise<B>, branch: (doRetry: (() => Promise<B>), i: number,  err: any) => Promise<B>): (a: A) => Promise<B> {
    return (value: A) => {
      function loop(p: Promise<B>, i: number, errors: any[]){
        return p.catch((err: any) => {
          errors.push(err);
          const q: Promise<B> = branch(() => { return gen(value); }, i, err);
          return q !== void 0 ? loop(q, i + 1,  errors) : Promise.reject({value: value, errors: errors});
        });
      }
      const p = Promise.resolve<A>(value).then(gen);
      return loop(p, 1, <any[]>[]);
    };
  }

  withRetryNTimes<A, B>(gen: (a: A) => Promise<B>, n: number): (a: A) => Promise<B> {
    const branch = (doRetry: () => Promise<B>, i: number, err: any) => {
      this.log(`\t\tretry: i=${i}`);
      if (i < n) {
        return doRetry();
      }
      return void 0;
    };
    return this.withRetry<A, B>(gen, branch);
  }

  withTimeout<A, B>(fn: PromiseFn<A, B>, n: number): (a: A) => Promise<B> {
    return (value: A) => {
      this.log(`\ttimeout: n=${n}`);
      const p = Promise.resolve(value);
      const ps: Promise<B>[] = [
        p.then(fn),
        p.then(this.toFakeAsync<A, B>(() => { return Promise.reject(`timeout: ${n}`); }, n))
      ];
      return Promise.race<B>(ps);
    };
  }

  withTick<A, B>(fn: PromiseFn<A, B>): (a: A|Promise<A>) => Promise<B> {
    return (x: A|Promise<A>) => {
      this.log("========================================");
      return this.coerce<A>(x).then(fn);
    };
  }

  withPeek<A, B>(fn: PromiseFn<A, B>): (a: A|Promise<A>) => Promise<B> {
    return (x: A|Promise<A>) => {
      this.log(`peek: ${x}`);
      return this.coerce<A>(x).then(fn);
    };
  }

  display(p: Promise<any>) {
    return p.then((v: any) => {
      this.log(`ok: ${JSON.stringify(v, null, 2)}`);
      return v;
    }, (err: any) => {
      this.log(`ng: ${JSON.stringify(err, null, 2)}`);
      if (!!err["stack"]) {
        this.log(`stack: ${err["stack"]}`);
      }
      throw err;
    });
  }

  private coerce<A>(a: A | Promise<A>) {
    return isPromise<A>(a) ? a : Promise.resolve<A>(a);
  }
}

function isPromise<A>(a: A | Promise<A>): a is Promise<A> {
  return !!(<any>a).then;
}
