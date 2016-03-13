interface Field<K, T> {
  id: K;
  name: string;
  value: T;
}

class Item {
  constructor(public name: string, public value: number) {}
}

type ItemValue = Field<string, Item>;
type Option1Value = Field<string, string>;
type Option2Value = Field<string, string>;
type SortTypeValue = Field<string, string>;

function select<K, T>(candidates: Field<K, T>[], key: K, defaultKey?: K): Field<K, T> {
  for (const f of candidates) {
    if (f.id === key) {
      return f;
    }
  }
  if (defaultKey) {
    const r =  select(candidates, defaultKey);
    if (!r) {
      throw new Error(`not available ${defaultKey} in ${candidates}`);
    }
    return r;
  }
}

class Option1Selector {
  public source:  Option1Value[];
  public candidates: Option1Value[];
  public current: Option1Value;

  constructor() {
    this.source = this.generateSource();
    this.reload();
  }

  reload() {
    this.candidates = this.generateCandidates();
  }

  init(k?: string) {
    this.current = select<string, string>(this.candidates, k, "a");
  }

  select(k: string) {
    this.current = select<string, string>(this.candidates, k);
  }

  private generateSource() {
    return [
      {name: "A", id: "a", value: "a"},
      {name: "B", id: "b", value: "b"},
      {name: "C", id: "c", value: "c"}
    ];
  }

  private generateCandidates() {
    return this.source;
  }
}

class Option2Selector {
  public source:  Option2Value[];
  public candidates: Option2Value[];
  public current: Option2Value;

  constructor() {
    this.source = this.generateSource();
    this.reload();
  }

  reload() {
    this.candidates = this.generateCandidates();
  }

  init(k?: string) {
    this.current = select<string, string>(this.candidates, k, "x");
  }

  select(k: string) {
    this.current = select<string, string>(this.candidates, k);
  }

  private generateSource() {
    return [
      {name: "X", id: "x", value: "x"},
      {name: "Y", id: "y", value: "y"},
      {name: "Z", id: "z", value: "z"}
    ];
  }

  private generateCandidates() {
    return this.source;
  }
}

class SortTypeSelector {
  public source:  SortTypeValue[];
  public candidates: SortTypeValue[];
  public current: SortTypeValue;

  constructor() {
    this.source = this.generateSource();
    this.reload();
  }

  reload() {
    this.candidates = this.generateCandidates();
  }

  init(k?: string) {
    this.current = select<string, string>(this.candidates, k, "asc");
  }

  select(k: string) {
    this.current = select<string, string>(this.candidates, k);
  }

  private generateSource() {
    return [
      {name: "asc", id: "asc", value: "ctime"},
      {name: "desc", id: "desc", value: "-ctime"}
    ];
  }

  private generateCandidates() {
    return this.source;
  }
}

class ItemSelector {
  public source:  ItemValue[];
  public candidates: ItemValue[];
  public current: ItemValue;

  constructor(items: Item[]) {
    this.source = this.generateSource(items);
    this.reload();
  }

  reload() {
    this.candidates = this.generateCandidates();
  }

  init(k?: string) {
    this.current = select<string, Item>(this.candidates, k, "potion");
  }

  select(k: string) {
    this.current = select<string, Item>(this.candidates, k);
  }

  private generateSource(items: Item[]) {
    let r: ItemValue[] = [];
    for (const item of items) {
      r.push({name: item.name, id: item.name, value: item});
    }
    return r;
  }

  private generateCandidates() {
    return this.source;
  }
}


class ItemCriteria {
  public itemSelector: ItemSelector;
  public option1Selector: Option1Selector;
  public option2Selector: Option2Selector;
  public sortTypeSelector: SortTypeSelector;

  constructor(items: Item[]) {
    this.itemSelector = new ItemSelector(items);
    this.option1Selector = new Option1Selector();
    this.option2Selector = new Option2Selector();
    this.sortTypeSelector = new SortTypeSelector();
  }

  init(v: {item?: string, option1?: string, option2?: string, sortType?: string}) {
    this.itemSelector.init(v.item);
    this.option1Selector.init(v.option1);
    this.option2Selector.init(v.option2);
    this.sortTypeSelector.init(v.sortType);
  }

  get item() {
    return this.itemSelector.current;
  }
  get option1() {
    return this.option1Selector.current;
  }
  get option2() {
    return this.option2Selector.current;
  }
  get sortType() {
    return this.sortTypeSelector.current;
  }
}

// main
const items = [
  new Item("potion", 100),
  new Item("something", 444)
];

let criteria = new ItemCriteria(items);
criteria.init({});

function view(c: ItemCriteria) {
  console.log(`item: ${c.item.name}, filter option: ${c.option1.name}, ${c.option2.name}, sort by: ${c.sortType.name}`);
}

view(criteria);
criteria.sortTypeSelector.select("desc");
view(criteria);