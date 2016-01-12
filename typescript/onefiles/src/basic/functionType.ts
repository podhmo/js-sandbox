type W = (x: string) => number;

function applyFunction(x: string, f: W) {
  return f(x);
}

const v = applyFunction("foo", (x: string) => {return 0; });
console.log(v);


type F =  number;

class A {
  constructor(public v: F) {}
}
console.log(new A(10));