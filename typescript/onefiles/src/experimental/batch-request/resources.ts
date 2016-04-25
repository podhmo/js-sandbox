import delay from "./delay";

export class Group {
  constructor (public name: string) {}
}

export class User {
  public group: Group;
  constructor (public groupId: number, public name: string, public age: number) {}
}

export interface Ref<T> {
  id: number;
  value: T;
}

const userGrops: {[id: number]: Group} = (() => {
  const a = new Group("A");
  const b = new Group("B");
  const c = new Group("C");
  return {1: a, 2: b, 3: c, 4: a, 5: a, 6: c};
})();

export function groupBatchAPI(pkList: number[]): Promise<Ref<Group>[]> {
  const groups = pkList.map((i: number) => {
    return {id: i, value: userGrops[i]};
  });
  console.log(`\tcallAPI: /group?${pkList.join(",")}`);
  return delay(() => groups, 10);
}

export function usersAPI(): Promise<User[]> {
  console.log("\tcallAPI: /user");
  const users = [
    new User(1, "foo", 20), new User(2, "bar", 10), new User(3, "boo", 22),
    new User(4, "foo", 20), new User(5, "bar", 10), new User(6, "boo", 22)
  ];
  return delay(() => users, 10);
}
