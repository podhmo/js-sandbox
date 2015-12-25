// see:http://falsandtru.hatenablog.com/entry/javascript-either-maybe-monad

namespace MaybeImpl {
    class Maybe<T> {
        private MAYBE: [T, void];
        constructor(private thunk_?: () => Maybe<T>){
        }
        public bind(f: (val: T) => Maybe<T>) : Maybe<T>;
        public bind<U>(f: (val: T) => Maybe<U>) : Maybe<U>;
        public bind<U>(f: (val: T) => Maybe<U>) : Maybe<U>{
            return new Maybe<U>(() => {
                const m = this.thunk_();
                switch (true){
                case m instanceof Just: {
                    return f((<Just<T>>m).extract());
                }case m instanceof Nothing: {
                    return <Nothing>m;
                }case m instanceof Maybe: {
                    return m.bind<U>(f);
                }
                default: {
                    throw new TypeError(`Invalid monad value: ${m}`);
                }
                }
            });
        }
        public extract(): T | void;
        public extract<U>(defaultValue?: U): T | U;
        public extract<U>(defaultValue?: U): T | U {
            return this.thunk_().extract(defaultValue);
        }
    }

    export class Just<T> extends Maybe<T> {
        private MAYBE_JUST: T;
        constructor(private val_: T){
            super();
        }
        public bind(f: (val: T) => Maybe<T>): Maybe<T>;
        public bind<U>(f: (val: T) => Maybe<U>): Maybe<U>;
        public bind<U>(f: (val: T) => Maybe<U>): any {
            return new Maybe(() => this).bind(f);
        }
        public extract(): T;
        public extract<U>(defaultValue: U): T;
        public extract<U>(defaultValue?: U): T {
            return this.val_;
        }
    }

    export class Nothing extends Maybe<any> {
        private MAYBE_NOTHING: void;
        public bind(f: (val: any) => Maybe<any>): Nothing {
            return this;
        }
        public extract(): void;
        public extract<U>(defaultValue: U): U;
        public extract<U>(defaultValue?: U): U {
            return defaultValue;
        }
    }
}

namespace Maybe {
    export function Just<T>(val: T){
        return new MaybeImpl.Just<T>(val);
    }
    export const Nothing = new MaybeImpl.Nothing();
    export const Return = Just;
}

// use
import Just = Maybe.Just;
import Nothing = Maybe.Nothing;
import Return = Maybe.Return;

const result = Return(0)
    .bind(n => Just(n + 1))
    .bind(n => Just(n + 1).bind(n => Just(`Just ${n}`)))
    .extract('Nothing');
console.log(result === 'Just 2');

const result = Return(Return(0))
    .bind(m => Just(m))
    .bind(m => m.bind(n => Just(n + 1)).bind(n => Just(`Just ${n}`)))
    .extract('Nothing');
console.log(result === 'Just 1');

const result = Return(0)
    .bind(n => Just(n + 1))
    .bind(n => Just(`Just ${n}`).bind(_ => Nothing))
    .bind(throwError)
    .extract('Nothing');
console.log(result === 'Nothing');

const result = Return(Return(0))
    .bind(m => m.bind(n => Nothing).bind(throwError))
    .bind(throwError)
    .extract('Nothing');
console.log(result === 'Nothing');

