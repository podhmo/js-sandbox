export interface CalculatorCore<T> {
    state: T;
    add(n: T): T;
    clear(value?: T): void;
}