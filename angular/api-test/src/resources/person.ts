export interface PersonData {
  name: string;
  age: number;
}

export type PersonJSONData = PersonData & JSONData;

export class Person implements PersonData {
  public name: string = "";
  public age: number = 0;

  constructor(data: PersonData) {
    Object.assign<this>(this, data);
  }

  output(): string {
    return `${this.name}: ${this.age}`;
  }
}