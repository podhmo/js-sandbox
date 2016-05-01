/// <reference path="./promise.d.ts"/>
import {FakePromiseModule} from "./fake-promise";

function inc(x) {
  return x + 1;
}

(() => {
  const m = new FakePromiseModule((s: string) => {
    console.log(`*: ${s}`);
  });
  const incAPI = m.toFakeAsync(inc, 30);
  const p = Promise.resolve(10)
    .then(incAPI)
    .then(incAPI)
    .then(incAPI)
    .then(incAPI)
  ;
  m.display(p);
})();

(() => {
  const m = new FakePromiseModule((s: string) => {
    console.log(`$: ${s}`);
  });
  const incAPI = m.toFakeAsync(inc, 30);
  const p = Promise.resolve(10)
    .then((v: number) => {
      return incAPI(v).then((v: number) => {
        return incAPI(v).then((v: number) => {
          return incAPI(v).then((v: number) => {
            return incAPI(v);
          });
        });
      });
    })
  ;
  m.display(p);
})();
