// OptionType(minimal version)

export interface Option<T>{
  get(): T;
  getOrElse(value: T): T;
  isEmpty(): boolean;
  fmap<U>(f: (v: T) => U): Option<U>;
  bind<U>(f: (v: T) => Option<U>): Option<U>;
}

class SomeImpl<T> implements Option<T> {
  constructor(public value: T) {
  }
  get(): T {
    return this.value;
  }
  getOrElse(value: T): T {
    return this.value || value;
  }
  isEmpty(): boolean {
    return !this.value;
  }
  fmap<U>(f: (v: T) => U): Option<U> {
    return new SomeImpl(f(this.value));
  }
  bind<U>(f: (v: T) => Option<U>): Option<U> {
    return f(this.value);
  }
}

// 本当はsingletonで良いはず
class NoneImpl<T> implements Option<T> {
  get(): T {
    throw new Error("invalid caller");
  }
  getOrElse(value: T): T {
    return value;
  }
  isEmpty(): boolean {
    return true;
  }
  fmap<U>(f: (v: T) => U): Option<U> {
    return <NoneImpl<U>>(<any>this);
  }
  bind<U>(f: (v: T) => Option<U>): Option<U> {
    return <NoneImpl<U>>(<any>this);
  }
}


export function unit<T>(value: T): Option<T> {
  return new SomeImpl<T>(value);
}

export function zero<T>(): Option<T> {
  return new NoneImpl<T>();
}
