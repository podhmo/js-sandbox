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
      throw new Error(`not available`);
    }
    return r;
  }
}

class ItemCriteria {
  public option1: Option1Value;
  public option1Fields: Option1Value[];
  public option2: Option2Value;
  public option2Fields: Option2Value[];
  public sortType: SortTypeValue;
  public sortTypeFields: SortTypeValue[];
  public source: ItemCriteriaSource;
  public item: ItemValue;
  public itemFields: ItemValue[];

  constructor(items: Item[], defaultItemId: string) {
    this.source = new ItemCriteriaSource(items);
    this.itemFields = this.generateItemCandidates();
    this.option1Fields = this.generateOption1Candidates();
    this.option2Fields = this.generateOption2Candidates();
    this.sortTypeFields = this.generateSortTypeCandidates();
  }

  init(v: {item?: string, option1?: string, option2?: string, sortType?: string}) {
    this.item = select<string, Item>(this.itemFields, v.item, "potion");
    this.option1 = select<string, string>(this.option1Fields, v.option1, "a");
    this.option2 = select<string, string>(this.option2Fields, v.option2, "x");
    this.sortType = select<string, string>(this.sortTypeFields, v.sortType, "asc");
  }

  private generateItemCandidates() {
    return this.source.itemsSource;
  }

  private generateOption1Candidates() {
    return this.source.option1Source;
  }

  private generateOption2Candidates() {
    return this.source.option2Source;
  }

  private generateSortTypeCandidates() {
    return this.source.sortTypeSource;
  }
}

class ItemCriteriaSource {
  public itemsSource: ItemValue[];
  public option1Source: Option1Value[];
  public option2Source: Option2Value[];
  public sortTypeSource: SortTypeValue[];

  constructor(items: Item[]) {
    this.itemsSource = this.generateItemSource(items);
    this.option1Source = this.generateOption1Source();
    this.option2Source = this.generateOption2Source();
    this.sortTypeSource = this.generateSortTypeSource();
  }

  private generateItemSource(items: Item[]) {
    let r: ItemValue[] = [];
    for (const item of items) {
      r.push({name: item.name, id: item.name, value: item});
    }
    return r;
  }

  private generateOption1Source() {
    return [
      {name: "A", id: "a", value: "a"},
      {name: "B", id: "b", value: "b"},
      {name: "C", id: "c", value: "c"}
    ];
  }

  private generateOption2Source() {
    return [
      {name: "X", id: "x", value: "x"},
      {name: "Y", id: "y", value: "y"},
      {name: "Z", id: "z", value: "z"}
    ];
  }

  private generateSortTypeSource() {
    return [
      {name: "asc", id: "asc", value: "ctime"},
      {name: "desc", id: "desc", value: "-ctime"}
    ];
  }
}

// main
const items = [
  new Item("potion", 100),
  new Item("something", 444)
];

let criteria = new ItemCriteria(items, "something");
criteria.init({});

function view(c: ItemCriteria) {
  console.log(`item: ${c.item.name}, filter option: ${c.option1.name}, ${c.option2.name}, sort by: ${c.sortType.name}`);
}

view(criteria);
criteria.sortType = select<string, string>(criteria.sortTypeFields, "desc");
view(criteria);