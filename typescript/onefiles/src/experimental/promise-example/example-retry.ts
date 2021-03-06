/// <reference path="./promise.d.ts"/>
import {FakePromiseModule} from "./fake-promise";

function inc(x: number) {
  return x + 1;
}

const m = new FakePromiseModule((s: string) => {
  console.log(`*: ${s}`);
});

(() => {
  const m = new FakePromiseModule((s: string) => {
    console.log(`*: ${s}`);
  });
  const incAPI = m.toFragile(m.toFakeAsync(inc, 100), 0.5);
  const incAPIRetry5 = m.withRetryNTimes<number, number>(incAPI, 5);
  const incAPIRetry5Captured = m.withTick<number, number>(m.withPeek<number, number>(incAPIRetry5));
  const p = Promise.resolve(1)
    .then(incAPIRetry5Captured)
    .then(incAPIRetry5Captured)
    .then(incAPIRetry5Captured)
    .then(incAPIRetry5Captured)
    .then(incAPIRetry5Captured)
    .then(incAPIRetry5Captured)
  ;
  m.display(p);
})();
