function greeter(person: string){
    return "Hello, " + person;
}

var user = "Jane User";

// qr_7910Wn.ts(6,5): error TS2403: Subsequent variable declarations must have the same type.  Variable 'user' must be of type 'string', but here has type 'number[]'.
// var user = [1,2,3];

console.log(greeter(user));