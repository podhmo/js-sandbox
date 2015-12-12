// Merging Interface
interface Box {
    height: number;
    width: number;
}

interface Box {
    scale: number;
}

var box: Box = {height: 5, width:6, scale: 10};


interface Document {
    createElement(tagName: any): Element;
}

interface Document {
    createElement(tagName: string): Element;
}

interface Document {
    createElement(tagName: "div"): HTMLDivElement;
    createElement(tagName: "span"): HTMLSpanElement;
    createElement(tagName: "canvas"): HTMLCanvasElement;
}

/* merged. is equvalent to */
// interface Document {
//     createElement(tagName: "div"): HTMLDivElement;
//     createElement(tagName: "span"): HTMLSpanElement;
//     createElement(tagName: "canvas"): HTMLCanvasElement;
//     createElement(tagName: string): HTMLElement;
//     createElement(tagName: any): Element;
// }



// Merging Modules

module Animals {
    export class Zebra{}
}

module Animals {
    export interface Legged {numberOfLegs: number;}
    export class Dog{}
}


// Merging Modules with Classes, Functions, and Enums

class Album {
    label: Album.AlbumLabel;
}
module Album {
    export class AlbumLabel {}
}


function buildLabel(name: string): string {
    return `${buildLabel.prefix} ${name} ${buildLabel.suffix}`;
}

module buildLabel {
    export var prefix = "Hello, ";
    export var suffix = "!";
}

console.log(buildLabel("World"))


enum Color {
    red = 1,
    green = 2,
    blue = 4
}

module Color {
    export function mixColor(colorName: string){
        if (colorName == "yellow"){
            return Color.red + Color.green;
        } else if (colorName == "white"){
            return Color.red + Color.green + Color.blue;
        } else if (colorName == "magenta"){
            return Color.red + Color.blue;
        } else if (colorName == "cyan"){
            return Color.green + Color.blue;
        }
    }
}



// Not all merges are allowed in TypeScript. Currently, classes can not merge with other classes