class Person {
  constructor(public name: string, public age: number) {}

  say() {
    return `${this.name}(${this.age})`;
  }
}

interface JSONData {
  [name: string]: JSONData|number|string|boolean|JSONData[];
}

interface ObjectConstructor {
  assign(data: any, data2: any): any;
}

interface Model {
  init?(): this;
  init?<T extends Model>(): T;
  lift?<T extends Model>(data: JSONData): T;
}

interface KlassStatic<Klass> extends Model {
  new(...rest: any[]): Klass;
  prototype: any;
}

function lift<T extends Model>(data: JSONData, cls: KlassStatic<T>): T {
  return !!cls.lift ? cls.lift<T>(data) : liftDefault<T>(data, cls);
}

function liftDefault<T extends Model>(data: JSONData, cls: KlassStatic<T>): T {
  const ob = <T>Object.assign(new cls(), data);
  return !!ob.init ? ob.init<T>() : ob;
}

const data: JSONData = {"name": "foo", "age": 20};
const person = lift<Person>(data, Person);
console.log(person.say());

// compile error -- Argument of type 'Person' is not assignable to parameter of type 'JSONData'.
// lift<Person>(person, Pereson);

// nesting data are supported?
class User extends Person {
}

class Group implements Model {
  constructor(public name: string, public users: User[]) {}

  static lift(data: JSONData) {
    let newdata: (JSONData & {users?: User[]}) = data;
    newdata.users = Array.prototype.map.call(
      data["users"] || [],
      (d: JSONData) => {return lift<User>(d, User); }
    );
    // if calling `lift<Group>(p)`, on this statement, infinite recursion is occured.
    return liftDefault<Group>(newdata, Group);
  }
}

const groupData: JSONData = {
  "name": "red",
  "users": [
    {"name": "foo", "age": 20},
    {"name": "bar", "age": 10},
  ]
};

const user = lift<User>({"name": "foo", "age": 100}, User);
console.log(user.say());

const group = lift<Group>(groupData, Group);
console.log(group.users[0].say());
