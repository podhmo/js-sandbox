type emit = (value: string) => string;

namespace tag {
    export function emit(value: string, tag: string="div"): string{
        return `<${tag}>${value}</${tag}>`;
    }
}
namespace s {
    export function emit(value: string): string{
        return `-${value}`;
    }
}

function output(emit: emit, items: string[]){
    items.forEach((e) => {console.log(emit(e));});
}

output((e) => {return tag.emit(e, "li");}, ["x", "y", "z"]);
console.log("");
output(s.emit, ["x", "y", "z"]);

console.log("----------------------------------------");

// interface

namespace i {
    export interface Emit{
        emit(value: string): string;
    }
}

namespace tag {
    export class Emit{
        constructor(public tag:string){
        }
        emit(value: string): string {
            return `<${this.tag}>${value}</${this.tag}>`;
        }
    }
}

namespace s {
    export class Emit{
        emit(value: string): string {
            return `- ${value}`;
        }
    }
}

function output2(emit: i.Emit, items: string[]){
    items.forEach((e, i) => {
        console.log(emit.emit(e));
    });
}


output2(new tag.Emit("li"), ["x", "y", "z"]);
console.log("");
output2(new s.Emit(), ["x", "y", "z"]);