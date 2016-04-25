class Person {
  constructor(public name: string, public age: number) {}
  message(message: string): string {
    return `${this.description}: ${message}`;
  }
  get description(): string {
    return `${this.name}(${this.age})`;
  }
}

const p = new Person("foo", 20);
console.log(p.message("hello"));

// person object from json

interface IPersonData {
  name: string;
  age: number;
}
interface Object {
  assign(...obs: Object[]): Object;
}


function personFromJson(data: IPersonData): Person {
  let p = Object.create(Person.prototype);
  return <Person>Object.assign(p, data);
}


const p2 = personFromJson({name: "foo", age: 20});
console.log(p2.message("hello"));


// using mixin
function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
class PersonBehavior implements Person {
  name: string;
  age: number;
  // only type declaration
  description: string;
  message: (message: string) => string;
}
applyMixins(PersonBehavior, [Person]);
function personFromJson2(data: IPersonData): Person {
  let p = new PersonBehavior();
  p.name = data.name;
  p.age = data.age;
  return p;
}

const p3 = personFromJson2({name: "foo", age: 20});
console.log(p3.message("hello"));

// create new class
class MyPerson implements Person {
  constructor(data: IPersonData) {
    this.name = data.name;
    this.age = data.age;
  }
  name: string;
  age: number;
  // only type declaration
  description: string;
  message: (message: string) => string;
}
applyMixins(MyPerson, [Person]);
function personFromJson3(data: IPersonData): Person {
  return new MyPerson(data);
}
const p4 = personFromJson3({name: "foo", age: 20});
console.log(p4.message("hello"));



// bechmark

declare var process: {hrtime(before?: [number, number]): [number, number]};
declare var global: {gc(): void};
function bm(title: string, n: number, thunk: Function) {
  console.log(title);
  const st = process.hrtime();
  for (let i=0; i<n; i++) {
    thunk();
  }
  console.log(`\t${process.hrtime(st)}`);
}
function bmbm(title: string, n: number, thunk: Function) {
  // global.gc();
  console.log("----------------------------------------");
  bm(title, n, thunk);
  bm(title, n, thunk);
  bm(title, n, thunk);
}

bmbm("create -- plain new object", 1000, () => {
  new Person("foo", 20);
});

const data = {name: "foo", age: 20};
bmbm("create -- from json", 1000, () => {
  personFromJson(data);
});
bmbm("create -- from json (mixin)", 1000, () => {
  personFromJson2(data);
});
bmbm("create -- from json (newclass)", 1000, () => {
  personFromJson3(data);
});

bmbm("message() -- plain new object", 1000, () => {
  p.message("hello");
});
bmbm("message() -- from json", 1000, () => {
  p2.message("hello");
});
bmbm("message() -- from json (mixin)", 1000, () => {
  p3.message("hello");
});
bmbm("message() -- from json (newclass)", 1000, () => {
  p4.message("hello");
});
