class User {
  constructor(
    public name: string,
    public age: number
  ) {}
}

// 1. inheritance

class UserViewObject extends User {
  public ctime: Date;
  constructor(
    name: string,
    age: number,
    public selected: boolean = false
  ) {
    super(name, age);
    this.ctime = new Date();
  }
  select() {
    this.selected = true;
  }
}

// 2. delegate

class UserContainer {
  public ctime: Date;
  constructor(
    public user: User,
    public selected: boolean = false
  ) {
    this.ctime = new Date();
  }

  get name(): string {
    return this.user.name;
  }
  set name(v: string) {
    this.user.name = v;
  }

  select() {
    this.selected = true;
  }
}

// 3. prototype chain

interface Selectable {
  select();
  selected: boolean;
}

function selectableWrapper<T>(ob: T, selected: boolean = false): Selectable & T {
  return Object.create(ob, {
    selected: {value: selected, writable: true},
    select: {value: function(){
      this.selected = true;
    }}
  });
}

let vUser = new UserViewObject("foo", 20);
vUser.select();
console.log(vUser.selected);

let user = new User("foo", 20);
let cUser = new UserContainer(user);
cUser.select();
console.log(cUser.selected);

let user2 = new User("foo", 20);
let wUser = selectableWrapper(user2);
wUser.select();
console.log(wUser.selected);

// hmm.
console.log([vUser.name, cUser.name, wUser.name, user.name, user2.name]);
vUser.name = "boo";
cUser.name = "boo";
wUser.name = "boo";
console.log([vUser.name, cUser.name, wUser.name, user.name, user2.name]);

// wUser.name is changed. but internal user object(user2).name is not changed.
// because previous code is almost same of this.

class User3 extends User {
  asViewUser(): UserViewObject {
    return new UserViewObject(this.name, this.age);
  }
}

let user3 = new User3("foo", 20);
let vUser3 = user3.asViewUser();
console.log([user3.name, vUser3.name]);
vUser3.name = "bar";
console.log([user3.name, vUser3.name]);

// container object has a reference of core object.
// inheritance or subtyping is a new object can be treated at same as core object.

/// -- a lie --
// // if using setter function base update, this is changing core object's state

// class Box {
//   constructor(private _name: string = "_box") {}
//   name(value?: string): string {
//     if (value) {
//       this._name = value;
//     }
//     return this._name;
//   }
// }

// let box = new Box("myBox");
// let wBox = selectableWrapper(box);
// console.log([box.name(), wBox.name()]);
// wBox.select();
// wBox.name("ourBox");
// console.log([box.name(), wBox.name()]);