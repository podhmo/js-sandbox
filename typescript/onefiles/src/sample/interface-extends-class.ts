class Person {
  constructor(public name: string, public age: number) {}
}

interface ISelectablePerson extends Person {
  selected: boolean;
}

function toSelectable(person: Person | ISelectablePerson) {
  let ob = <ISelectablePerson>person;
  if (ob.selected === undefined) {
    ob.selected = false;
  }
  return ob;
}

const p = new Person("foo", 20);
console.log(toSelectable(p).selected);
console.log(toSelectable(toSelectable(p)).selected);

// but cannot have method.