// compile error => OK
// namespace dot {
//     export function use(o: {name: string}){
//         console.log(`name: ${o.name}`);
//         console.log(`age: ${o.age}`);
//     }
// }

namespace dot {
    export function use(o: {name: string, age?: number}){
        console.log(`name: ${o.name}`);
        console.log(`age: ${o.age}`);
    }
}


// no compile error => NG
namespace index {
    export function use(o: {name: string}){
        console.log(`name: ${o["name"]}`);
        console.log(`age: ${o["age"]}`);
    }
}
