import * as b from "./00-base";

/* using child directly */
class ChildAdapter implements b.IPerson {
  constructor(public p: b.Parent) {}

  get child (): b.IPerson {
    return this.p.child;
  }

  get name(): string {
    return this.child ? this.child.name : "*dummmy*";
  }

  get age(): number {
    return this.child ? this.child.age : -1;
  }
}

// creation case. ok;
(() => {
  const p = new b.Parent();
  p.create("foo", 20);
  const display = new b.ChildDisplay(new ChildAdapter(p));
  display.display();
})();

// updating case. ok;
(() => {
  const p = new b.Parent();
  p.create("foo", 20);
  const display = new b.ChildDisplay(new ChildAdapter(p));
  p.rename("bar");
  display.display();
})();

// deleting case. ok;
(() => {
  const p = new b.Parent();
  p.create("foo", 20);
  const display = new b.ChildDisplay(new ChildAdapter(p));
  p.delete();
  display.display(); // expect: error is thrown.
})();
