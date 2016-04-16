namespace UserM {
  "use strict";
  export type id = {id: number};
  export type name = {name: string}
  export type age = {age: number;}
  export type groupId = {groupId: number;}
  export type Table = id & name & age & groupId;
}

namespace GroupM {
  "use strict";
  export type id = {id: number};
  export type name = {name: string}
  export type Table = id & name;
}

class User {
  constructor(
    public id: number,
    public name: string,
    public age: number,
    public groupId: number
  ) {}
}

interface PlainJSON {
  [name: string]: number | string | boolean | PlainJSON | PlainJSON[];
}

const data: (PlainJSON & UserM.id & UserM.name & {group: GroupM.Table}) = (() => {
  return {id: 10, name: "foo", group: {id: 1, name: "G"}};
})();

console.log(data);