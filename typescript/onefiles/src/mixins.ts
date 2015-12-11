class Disposable {
    isDisposed: boolean;
    dispose(){
        this.isDisposed = true;
    }
}

class Activatable {
    isActive: boolean;
    activate(){
        this.isActive = true;
    }
    deactivate(){
        this.isActive = false;
    }
}

// using classes as interfaces, so using `implements` not `extends`
class SmartObject implements Disposable, Activatable {
    constructor(){
        setInterval(() => console.log(`${this.isActive}: ${this.isDisposed}`),  500);
    }

    interact(){
        this.activate();
    }

    // Disposable
    isDisposed: boolean = false;
    dispose: () => void;
    // Activatable
    isActive: boolean = false;
    activate: () => void;
    deactivate: () => void;
}
function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        })
    });
}
applyMixins(SmartObject, [Disposable, Activatable]);

var so = new SmartObject();
setTimeout(() => so.interact(), 1000);

