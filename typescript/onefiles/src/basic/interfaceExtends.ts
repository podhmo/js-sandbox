interface IA {
  a: string;
}

interface IAB extends IA {
  b: string;
}

const data: IAB = {a: "foo", b: "bar"};
console.log(data);
