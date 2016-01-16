class A {
  static getName(): string {
    return "A";
  }
}

class B extends A {
}

class C extends A {
  static getName(): string {
    return `${super.getName()} C`;
  }
}

console.log(B.getName()); // "A"
console.log(C.getName()); // "A C"