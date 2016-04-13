import * as b from "./00-base";

/* using child directly */

// creation case. ok;
(() => {
  const p = new b.Parent();
  p.create("foo", 20);
  const display = new b.ChildDisplay(p.child);
  display.display();
})();

// creation case2. ng;
(() => {
  const p = new b.Parent();
  const display = new b.ChildDisplay(p.child);
  // display.display();
})();

// updating case. ok;
(() => {
  const p = new b.Parent();
  p.create("foo", 20);
  const display = new b.ChildDisplay(p.child);
  p.rename("bar");
  display.display();
})();

// deleting case. ng;
(() => {
  const p = new b.Parent();
  p.create("foo", 20);
  const display = new b.ChildDisplay(p.child);
  p.delete();
  display.display(); // expect: error is thrown. or dummy value;
})();
