function strict(value: number){
    return value.toFixed();
}
function loosed(value?: number){
    return strict(value);
}

console.log(loosed(10));

// runtime error
console.log(loosed(null));

// runtime error
console.log(loosed({}["value"]));