export default function delay<T>(thunk: () => T, waitTime: number): Promise<T> {
  return new Promise<T>((resolve: (v: T) => void) => {
    setTimeout(() => {
      resolve(thunk());
    }, waitTime);
  });
}
