declare var mock: mock.IMockStatic;
declare var require: (name: string) => any

declare module mock {
  interface IMockStatic {
    API: <T>() => T;
  }
}