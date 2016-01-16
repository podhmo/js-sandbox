// server side
interface JSONData {
  [name: string]: JSONData|number|string|boolean|JSONData[];
}

interface PersonData {
  name: string;
  age: number;
}

type PersonJSONData = PersonData & JSONData;

function personAPI(): PersonJSONData {
  return {name: "foo",  "age": 10};
}

// api request

interface APIMapping {
  [path: string]: Function;
}

class Response<T> {
  constructor(public data: T) {}
}

class APIClient {
  constructor(public mapping: APIMapping) {}

  get<T extends JSONData>(path: string) {
    const data: T = this.mapping[path]();
    return new Response<T>(data);
  }
}

// domain

class Person implements PersonData {
  constructor(
    public name: string = "",
    public age: number = 0
  ) {}
  say() {
    return `${this.name}(${this.age})`;
  }
}

interface ObjectConstructor {
  assign(data0: any, data1: any): any;
  assign<T>(data0: T, data1: T): T;
}

// application

function main() {
  const mapping: APIMapping = {
    "/person": personAPI
  };

  const client = new APIClient(mapping);

  // // ok this is fixed.
  // // unfortunately, this is not compile error.
  // const person: Person = client.get<Person>("/person").data;
  // // actually the value of person is not Person object, PersonJSONData object(just JSON data).
  // console.log(person.say()); // error: say() method is not found

  const data = client.get<PersonJSONData>("/person").data;
  const person = Object.assign(new Person(), data);
  console.log(person.say());
}

main();