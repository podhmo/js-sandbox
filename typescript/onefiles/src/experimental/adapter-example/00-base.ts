export interface IPerson {
  name: string;
  age: number;
}

export class Parent {
  constructor(public child?: Child) {}
  create(name: string, age: number = 0) {
    this.child = new Child(name, age);
    return this.child;
  }

  rename(name: string) {
    this.child.name = name;
    return this.child;
  }

  delete() {
    delete this.child;
  }
}

export class Child implements IPerson {
  constructor(public name: string, public age: number = 0) {}
}

export class ChildDisplay {
  constructor(public child?: IPerson) {}

  display() {
    console.log(`child: '${this.child.name}(${this.child.age})'`);
  }
}

