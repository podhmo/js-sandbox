import {CalculatorCore} from "./interfaces";
import {DummyCore} from "./core";

export class Caluclator {
    core: CalculatorCore<number>;
    constructor(){
        this.core = new DummyCore(0);
    }
    get value(): number{
        return this.core.state;
    }

    add(n: number){
        return this.core.add(n);
    }
    clear(value? :number): void{
        return this.clear(value);
    }
}
