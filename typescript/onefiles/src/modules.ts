interface StringValidator {
    isAcceptable(s: string): boolean;
}


class LettersOnlyValidator implements StringValidator {
    static regexp = /^[A-Za-z]+$/;

    isAcceptable(s: string) {
        return LettersOnlyValidator.regexp.test(s);
    }
}

class ZipCodeValidator implements StringValidator{
    static regexp = /^[0-9]+$/;

    isAcceptable(s: string){
        return s.length == 5 && ZipCodeValidator.regexp.test(s);
    }
}

// Some samples to try
var strings = ['Hello', '98052', '101'];
// Validators to use
var validators: { [s: string]: StringValidator; } = {};
validators['ZIP code'] = new ZipCodeValidator();
validators['Letters only'] = new LettersOnlyValidator();
// Show whether each string passed each validator
strings.forEach(s => {
    for (var name in validators) {
        console.log('"' + s + '" ' + (validators[name].isAcceptable(s) ? ' matches ' : ' does not match ') + name);
    }
});



// Adding Modularity
console.log("----------------------------------------");
module Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }

    export class LettersOnlyValidator implements StringValidator {
        static regexp = /^[A-Za-z]+$/;

        isAcceptable(s: string) {
            return LettersOnlyValidator.regexp.test(s);
        }
    }

    export class ZipCodeValidator implements StringValidator{
        static regexp = /^[0-9]+$/;

        isAcceptable(s: string){
            return s.length == 5 && ZipCodeValidator.regexp.test(s);
        }
    }
}

// Some samples to try
var strings = ['Hello', '98052', '101'];
// Validators to use
var validators: { [s: string]: Validation.StringValidator; } = {};
validators['ZIP code'] = new Validation.ZipCodeValidator();
validators['Letters only'] = new Validation.LettersOnlyValidator();
// Show whether each string passed each validator
strings.forEach(s => {
    for (var name in validators) {
        console.log('"' + s + '" ' + (validators[name].isAcceptable(s) ? ' matches ' : ' does not match ') + name);
    }
});

// Multi-file internal modules
// (find-file "./multifiles")
