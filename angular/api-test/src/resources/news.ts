export interface NewsData {
  name: string;
  message: string;
}

export type NewsJSONData = NewsData & JSONData;

export class News implements NewsData {
  public name: string = "";
  public message: string = "";

  constructor(data: NewsData) {
    Object.assign<this>(this, data);
  }

  output(): string {
    return `${this.name}: ${this.message}`;
  }
}