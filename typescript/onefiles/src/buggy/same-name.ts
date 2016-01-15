class Person {
  constructor(public name: string, public age: number) {}
  say() { console.log(`${this.name}(${this.age})`); }
}

class Hito {
  constructor(public name: string, public age: number) {}
  say() { console.log(`${this.name}(${this.age})`); }
}

class Hito2 {
  constructor(private name: string, private age: number) {}
  say() { console.log(`${this.name}(${this.age})`); }
}

function show(p: Person) {
  console.log(`${p.name}(${p.age})`);
}

function show2(p: Person) {
  p.say();
}

show(new Hito("foo", 10));
// show(new Hito2("foo", 10)); // error

show2(new Hito("foo", 10));
// show2(new Hito2("foo", 10)); // error

