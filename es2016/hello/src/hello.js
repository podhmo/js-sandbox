export default class Hello {
  constructor(name){
    this.name = name;
  }
  say(){
    return `${this.name}: hello`
  }
}
