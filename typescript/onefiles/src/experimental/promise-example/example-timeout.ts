/// <reference path="./promise.d.ts"/>
import {FakePromiseModule} from "./fake-promise";

function inc(x: number) {
  return x + 1;
}


(() => {
  const m = new FakePromiseModule((s: string) => {
    console.log(` *: ${s}`);
  });
  const incAPI = m.toFakeAsync(inc, 500);
  const p = Promise.resolve(1)
    .then(m.withTimeout(incAPI, 700));
  ;
  m.display(p);
})();

(() => {
  const m = new FakePromiseModule((s: string) => {
    console.log(`**: ${s}`);
  });
  const incAPI = m.toFakeAsync(inc, 500);
  const p = Promise.resolve(1)
    .then(m.withTimeout(incAPI, 300));
  ;
  m.display(p);
})();
