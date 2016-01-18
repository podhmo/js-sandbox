function foo1Directive(){
  return {
    restrict: 'A',
    link: function(scope, $element) {
      console.log("directive1: $id:%s", scope.$id);
    }
  };
}
foo1Directive.$inject = [];

function foo2Directive(){
  return {
    priority: 400,
    restrict: 'A',
    link: function(scope, $element) {
      console.log("directive2: $id:%s", scope.$id);
    }
  };
}
foo2Directive.$inject = [];

function foo3Directive(){
  return {
    terminal: true,
    priority: 400,
    restrict: 'A',
    link: function(scope, $element) {
      console.log("directive3: $id:%s", scope.$id);
    }
  };
}
foo3Directive.$inject = [];

require('./setup')(function(angular){
  var app = angular.module("app", []);

  app.directive("foo", foo1Directive); // skip for terminal=true by foo3
  app.directive("foo", foo2Directive);
  app.directive("foo", foo3Directive);

  // var injector = angular.injector(["ng", "app"]);
  // var $compile = injector.get("$compile");
  // var $rootScope = injector.get("$rootScope");
  // var e = angular.element($compile("<div foo>hai</div>")($rootScope));

  document.body.innerHTML = '<div foo>hai</div>';
  angular.bootstrap(document, ["app"]);
  console.log(angular.element(document.body).html());
});
