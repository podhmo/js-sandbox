interface Record<K, T> {
  id: K;
  name: string;
  value: T;
}

class Item {
  constructor(public name: string, public value: number) {}
}

type ItemValue = Record<string, Item>;
type Option1Value = Record<string, string>;
type Option2Value = Record<string, string>;
type SortTypeValue = Record<string, string>;

function fetch<K, T>(candidates: Record<K, T>[], key: K, defaultKey?: K): Record<K, T> {
  for (const f of candidates) {
    if (f.id === key) {
      return f;
    }
  }
  if (defaultKey) {
    const r =  fetch(candidates, defaultKey);
    if (!r) {
      throw new Error(`not available`);
    }
    return r;
  }
}

class ItemCriteria {
  public option1: Option1Value;
  public option1Records: Option1Value[];
  public option2: Option2Value;
  public option2Records: Option2Value[];
  public sortType: SortTypeValue;
  public sortTypeRecords: SortTypeValue[];
  public database: ItemCriteriaDatabase;
  public item: ItemValue;
  public itemRecords: ItemValue[];

  constructor(items: Item[], defaultItemId: string) {
    this.database = new ItemCriteriaDatabase(items);
    this.itemRecords = this.filterItemTable();
    this.option1Records = this.filterOption1Table();
    this.option2Records = this.filterOption2Table();
    this.sortTypeRecords = this.filterSortTypeTable();
  }

  init(v: {item?: string, option1?: string, option2?: string, sortType?: string}) {
    this.item = fetch<string, Item>(this.itemRecords, v.item, "potion");
    this.option1 = fetch<string, string>(this.option1Records, v.option1, "a");
    this.option2 = fetch<string, string>(this.option2Records, v.option2, "x");
    this.sortType = fetch<string, string>(this.sortTypeRecords, v.sortType, "asc");
  }

  private filterItemTable() {
    return this.database.itemsTable;
  }

  private filterOption1Table() {
    return this.database.option1Table;
  }

  private filterOption2Table() {
    return this.database.option2Table;
  }

  private filterSortTypeTable() {
    return this.database.sortTypeTable;
  }
}

class ItemCriteriaDatabase {
  public itemsTable: ItemValue[];
  public option1Table: Option1Value[];
  public option2Table: Option2Value[];
  public sortTypeTable: SortTypeValue[];

  constructor(items: Item[]) {
    this.itemsTable = this.createItemTable(items);
    this.option1Table = this.createOption1Table();
    this.option2Table = this.createOption2Table();
    this.sortTypeTable = this.createSortTypeTable();
  }

  private createItemTable(items: Item[]) {
    let r: ItemValue[] = [];
    for (const item of items) {
      r.push({name: item.name, id: item.name, value: item});
    }
    return r;
  }

  private createOption1Table() {
    return [
      {name: "A", id: "a", value: "a"},
      {name: "B", id: "b", value: "b"},
      {name: "C", id: "c", value: "c"}
    ];
  }

  private createOption2Table() {
    return [
      {name: "X", id: "x", value: "x"},
      {name: "Y", id: "y", value: "y"},
      {name: "Z", id: "z", value: "z"}
    ];
  }

  private createSortTypeTable() {
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
criteria.sortType = fetch<string, string>(criteria.sortTypeRecords, "desc");
view(criteria);