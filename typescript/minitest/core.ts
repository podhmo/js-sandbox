// todo: interface
export class DummyCore{
    constructor(public state:number){
    }
    add(n: number){
        this.state += n;
        return this.state;
    }
    clear(value? : number): void{
        this.state = value || 0;
    }
}