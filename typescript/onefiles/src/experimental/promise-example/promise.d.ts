declare namespace Promise {
  function resolve<T>(value?: T | Thenable<T>): Promise<T>;
  function reject(error: any): Promise<any>;
  function reject<T>(error: T): Promise<T>;
  function all<T>(promises: (T | Thenable<T>)[]): Promise<T[]>;
  function race<T>(promises: (T | Thenable<T>)[]): Promise<T>;
}

interface Thenable<T> {
  then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => U | Thenable<U>): Thenable<U>;
  then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => void): Thenable<U>;
  catch<U>(onRejected?: (error: any) => U | Thenable<U>): Thenable<U>;
}

declare class Promise<T> implements Thenable<T> {
  constructor(callback: (resolve : (value?: T | Thenable<T>) => void, reject: (error?: any) => void) => void);
  then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => U | Thenable<U>): Promise<U>;
  then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => void): Promise<U>;
  catch<U>(onRejected?: (error: any) => U | Thenable<U>): Promise<U>;
}
