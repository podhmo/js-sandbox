interface Named {
    name: string;
}

interface Aged {
    age: number;
}

class Person implements Aged, Named {
    constructor(public name:string, public age:number){
    }
}


function show(o: Named & Aged){
    return `${o.name}(${o.age})`;
}
function show2(o: {name:string, age:number}){
    return `${o.name}(${o.age})`;
}

interface StringAged {
    age: string;
}

let p = new Person("foo", 20)
console.log(show(p));
console.log(show2(p));
console.log(show({"name": "foo", "age": 20}));
console.log(show2({"name": "foo", "age": 20}));


function show3(o: Named & (Aged | StringAged)){
    // o.age :: int | string
    return `${o.name}(${o.age})`;
}
// error
// console.log(show({"name": "foo", "age": "20歳"}));
// console.log(show2({"name": "foo", "age": "20歳"}));
console.log(show3({"name": "foo", "age": "20歳"}));