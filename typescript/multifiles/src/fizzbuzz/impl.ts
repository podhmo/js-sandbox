export function fizzbuzz(from:number, to:number, cb: (string) => void){
  for(let i=from; i<to; i++){
    let arr = [];
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
