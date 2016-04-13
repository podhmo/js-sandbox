import * as b from "./00-base";

/* using child directly */
class ChildWrapper implements b.IPerson {
  constructor(public childProp: () => b.Child) {}

  get name(): string {
    const child = this.childProp();
    return child ? child.name : "*dummy*";
  }

  get age(): number {
    const child = this.childProp();
    return child ? child.age : -1;
  }
}

// creation case. ok;
(() => {
  const p = new b.Parent();
  p.create("foo", 20);
  const display = new b.ChildDisplay(new ChildWrapper(() => p.child));
  display.display();
})();

// updating case. ok;
(() => {
  const p = new b.Parent();
  p.create("foo", 20);
  const display = new b.ChildDisplay(new ChildWrapper(() => p.child));
  p.rename("bar");
  display.display();
})();

// deleting case. ok;
(() => {
  const p = new b.Parent();
  p.create("foo", 20);
  const display = new b.ChildDisplay(new ChildWrapper(() => p.child));
  p.delete();
  display.display(); // expect: error is thrown.
})();
