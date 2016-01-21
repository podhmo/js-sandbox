require('../setup')(function(angular){
  var injector = angular.injector(["ng"]);
  var $rootScope = injector.get("$rootScope");
  var childScope = $rootScope.$new();
  var grandChildScope = childScope.$new();

  console.log(grandChildScope.$parent.$parent === $rootScope);

  console.log("----------------------------------------");
  $rootScope.x = "xxxxx";
  console.log("root: %s", $rootScope.x);
  console.log("root -> child: %s", childScope.x);
  console.log("root -> child -> grand-child: %s", grandChildScope.x);

  console.log("----------------------------------------");
  childScope.x = "yyyyy";
  console.log("root: %s", $rootScope.x);
  console.log("root -> child: %s", childScope.x);
  console.log("root -> child -> grand-child: %s", grandChildScope.x);
});
