class X {
  say() {
    return "x";
  }
}
class Y {
}

// this is bad.
// const values: any[] = [new X(), new Y()];
// console.log((<X>values[0]).say());

// *using union type*
// this is not good
// const values: (X | Y)[] = [new X(), new Y()];
// console.log((<X>values[0]).say());

// *using tuple*
const values: [X, Y] = [new X(), new Y()];
// const values: [Y, X] = [new X(), new Y()]; // compile error
console.log(values[0].say());
// console.log(values[1].say()); // compile error