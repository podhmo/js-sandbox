interface ObjectConstructor {
  assign<T>(data1: T,  data2: any): T;
}

class Base {
  public description: string;

  // impossible
  // static create(data: any): this {
  //   return Object.assign(new this(), data);
  // }
}

class A extends Base {
  name() {
    return "a";
  }
}

class AB extends A {
}

class AC extends A {
  name() {
    return `${super.name()} c`;
  }
}

class AD extends A {
  name() {
    return `${super.name()} d`;
  }
  static create<T extends AD>(cls: CreateStatic<T>, data: any): T {
    const d = new cls();
    console.log("AD!!");
    return Object.assign(d, data);
  }
}

class ADE extends AD {
  name() {
    return `${super.name()} e`;
  }
}

interface CreateStatic<T> {
  new(...args: any[]): T;
  create?<T>(cls: CreateStatic<T>, data: any): T;
}

function create<T extends Base>(cls: CreateStatic<T>, data: any) {
  if (!!cls.create) {
    return cls.create<T>(cls, data);
  }
  return Object.assign(new cls(), data);
}

console.log(new A().name());

const a = create<A>(A, {});
console.log(a.name());
const b = create<AB>(AB, {});
console.log(b.name());
const c = create<AC>(AC, {});
console.log(c.name());
const d = create<AD>(AD, {});
console.log(d.name());
const e = create<ADE>(ADE, {});
console.log(e.name()); // expected: a d e, actual: a d?
console.log(new ADE().name()); // a d e
