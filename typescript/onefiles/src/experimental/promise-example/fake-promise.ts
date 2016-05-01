export interface PromiseFn<A, B> {
  (a: A): B | Thenable<B>;
}

export class FakePromiseModule {
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

  withTick<A, B>(fn: PromiseFn<A, B>) {
    return (x) => {
      this.log("========================================");
      return fn(x);
    };
  }

  withPeek<A, B>(fn: PromiseFn<A, B>) {
    return (x) => {
      this.log(`peek: ${x}`);
      return fn(x);
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



