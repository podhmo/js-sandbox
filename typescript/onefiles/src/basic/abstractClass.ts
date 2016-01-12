abstract class Say {
  abstract say(): string;
}

class Person extends Say {
  say() {
    return "hai";
  }
}

console.log(new Person().say());