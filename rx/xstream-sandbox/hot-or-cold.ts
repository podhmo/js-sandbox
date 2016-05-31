///<reference path="./es6-promise.d.ts"/>

// this is hot, isn't it?

import xs from "xstream";

let stream = xs.periodic(100).take(5);

stream.addListener({
  next: i => console.log(`0: ${i}`),
  error: err => console.error(err),
  complete: () => console.log("completed")
});

setTimeout(() => {
  stream.addListener({
    next: i => console.log(`1: ${i}`),
    error: err => console.error(err),
    complete: () => console.log("completed")
  });
}, 300);