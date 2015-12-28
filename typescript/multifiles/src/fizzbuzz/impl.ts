export function fizzbuzz(from:number, to:number, cb: (x:string) => void){
    for(let i=from; i<to; i++){
        let arr : string[] = [];
        if(i % 3 == 0){
            arr.push("fizz");
        }
        if(i % 5 == 0){
            arr.push("buzz");
        }
        if(arr.length == 0){
            arr.push(String(i));
        }
        cb(arr.join(""));
    }
}
