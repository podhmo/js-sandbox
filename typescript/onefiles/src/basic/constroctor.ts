class Person {
  public name: string;
  public age: number;

  constructor(
    name: string = "",
    age: number = 0
  ) {
    this.name = name;
    this.age = age;
  }
}

console.log(new Person());
console.log(new Person("foo", 10));


// short version

class Person2 {
  constructor(public name: string = "", public age: number = 0) {
  }
}

console.log(new Person2());
console.log(new Person2("foo", 10));
