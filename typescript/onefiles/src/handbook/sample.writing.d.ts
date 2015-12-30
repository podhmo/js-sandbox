declare var MyPoint: {x: number,  y: number};

interface SomePoint {
    x: number;
    y: number;
}
declare var MyPoint2: SomePoint;


interface SomPoint {
    z: number;
}

MyPoint2.z = 4 // OK. (declaration merging)



// Class Decomposition
// standard
class A {
    static st: string;
    inst: number;
    constructor(m: any){
    }
}

// decomposed
interface B_Static {
    new(m: any): B_Instance;
    st: string;
}
interface B_Instance {
    inst: number;
}
declare var B: B_Static;



//  Options Objects

/*
animalFactory.create("dog");
animalFactory.create("giraffe", { name: "ronald" });
animalFactory.create("panda", { name: "bob", height: 400 });
// Invalid: name must be provided if options is given
animalFactory.create("cat", { height: 32 });
*/

module animalFactory {
    interface AnimalOptions {
        name: string;
        height?: number;
        weight?: number;
    }
    function create(name: string, options?: AnimalOptions): Animal;
}


// Function with properties
/*
zooKeeper.workSchedule = "morning";
zooKeeper(giraffeCage);
*/
function zooKeeper(cage: AnimalCage);
module zooKeeper{
    var workSchdule: string;
}


// New + callable methods;
/*
var w = widget(32, 16);
var y = new widget("sprocket");
// w and y are both widgets
w.sprock();
y.sprock();
*/
interface Widget {
    sprock(): void;
}
interface WidgetFactory {
    new(name: string): Widget;
    (width: number, height: number): Widget;
}

declare var widget: WidgetFactory;


// Global / External-agnostic Libraries
/*
// Either
import x = require('zoo');
x.open();
// or
zoo.open();
*/
module zoo {
  function open(): void;
}

declare module "zoo" {
    export = zoo;
}
