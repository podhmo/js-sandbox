/// <reference path="./promise.d.ts"/>
import {FakePromiseModule} from "./fake-promise";

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

