// 無理
// function describe(n: number){
//     return {value: n, type: "number"};
// }
// function describe(s: string){
//     return {value: s, type: "string"};
// }

type Value = number | string;
type Description = {value: Value,  type: string};

function describe(n: number): Description
function describe(s: string): Description
function describe(o: Value): Description{
    if(typeof(o) == "number"){
        return {value: o, type: "number"};
    }else {
        return {value: o, type: "string"};
    }
}

console.log(describe(10));
console.log(describe("foo"));
