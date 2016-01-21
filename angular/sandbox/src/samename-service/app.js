require('../setup')(function(angular){
  angular.module("a", []).value("v", "a");
  angular.module("b", []).value("v", "b");
  angular.module("c", ["a", "b"]);
  angular.module("d", ["b", "a"]);

  console.log(angular.injector(["a", "b"]).get("v"));
  console.log(angular.injector(["b", "a"]).get("v"));
  console.log(angular.injector(["c"]).get("v"));
  console.log(angular.injector(["d"]).get("v"));
  console.log(angular.injector(["d", "b"]).get("v"));

// b
// a
// b
// a
// a
});

