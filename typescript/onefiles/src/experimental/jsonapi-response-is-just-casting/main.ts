// server side
interface PersonJSONData {
  name: string;
  age: number;
}

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

  get<T>(path: string) {
    const data: T = this.mapping[path]();
    return new Response<T>(data);
  }
}

// domain

class Person implements PersonJSONData {
  constructor(
    public name: string,
    public age: number
  ) {}
  say() {
    return `${this.name}(${this.age})`;
  }
}

// application

function main() {
  const mapping: APIMapping = {
    "/person": personAPI
  };

  const client = new APIClient(mapping);

  // unfortunately, this is not compile error.
  const person: Person = client.get<Person>("/person").data;

  // actually the value of person is not Person object, PersonJSONData object(just JSON data).
  console.log(person.say()); // error: say() method is not found
}

main();