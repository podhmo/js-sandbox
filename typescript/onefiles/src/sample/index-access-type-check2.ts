function run(fn, section){
    console.log(`-- ${section} --`);
    try {
        fn({name: "foo", age: 20});
    } catch(e){
        console.log(`${e} with {name, age}`);
    }
    try {
        fn({name: "foo"});
    } catch(e){
        console.log(`${e} with {name}`);
    }
}

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

run(dot.use, "dot");
run(index.use, "index");


// compile error => OK
// namespace dot {
//     export function doesNotHaveMethod(o: {name: string}){
//         console.log(o.age.toFixed());
//     }
// }

// no compile error => OK
namespace dot {
    export function doesNotHaveMethod(o: {name: string, age?: number}){
        console.log(o.age.toFixed());
    }
}

// but if, this code is called with a object such as {name: "foo"}, runtime error is occured!!
// (using maybe monad? or something like that)

// this is workaround
namespace getDefault {
    export function onNumber(){return 0;}
    export function onString(){return "";}
}
namespace dot {
    export function doesNotHaveMethod2(o: {name: string, age?: number}){
        console.log((o.age || getDefault.onNumber()).toFixed());
    }
}


// no compile error => NG
namespace index {
    export function doesNotHaveMethod(o: {name: string}){
        console.log(o["age"].toFixed());
    }
}

run(dot.doesNotHaveMethod, "dot");
run(dot.doesNotHaveMethod2, "dot with default");
run(index.doesNotHaveMethod, "index");