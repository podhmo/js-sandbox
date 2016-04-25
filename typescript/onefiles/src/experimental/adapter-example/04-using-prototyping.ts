import * as b from "./00-base";

// hmm
function delegate(ob: any, dst:string): b.IPerson {
  return <b.IPerson>Object.create(null, {
    name: {get: () => ob[dst] ? ob[dst].name : "*dummy*"},
    age: {get: () => ob[dst] ? ob[dst].age : -1 }
  });
}

// creation case. ok;
(() => {
  const p = new b.Parent();
  p.create("foo", 20);
  const display = new b.ChildDisplay(delegate(p, "child"));
  display.display();
})();

// updating case. ok;
(() => {
  const p = new b.Parent();
  p.create("foo", 20);
  const display = new b.ChildDisplay(delegate(p, "child"));
  p.rename("bar");
  display.display();
})();

// deleting case. ok;
(() => {
  const p = new b.Parent();
  p.create("foo", 20);
  const display = new b.ChildDisplay(delegate(p, "child"));
  p.delete();
  display.display(); // expect: error is thrown.
})();
