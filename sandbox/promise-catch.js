Promise.reject("help me").then(function(v){
  console.log("then: %s", v);
}).catch(function(v){
  console.log("catch: %s", v);
}).then(function(){
  console.log("done 1 ok");
}, function(){
  console.log("done 1 ng");
});

Promise.reject("help me").then(function(v){
  console.log("then: %s", v);
}, function(){
  // todo: error recovery
}).catch(function(v){
  console.log("catch: %s", v);
}).then(function(){
  console.log("done 2 ok");
}, function(){
  console.log("done 2 ng");
});
