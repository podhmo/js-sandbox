var ca = require('console-angular');

ca.setup(function(angular, document){
  var app = angular.module("app", []);
  app.directive("parent", function(){
    return {
      restrict: "E",
      scope: {},
      bindToController: {},
      controller: function($timeout){
        this.tabs = ["one", "two", "three"];
        this.current = this.tabs[0];
        $timeout(function(){
          this.current = this.tabs[2];
        }.bind(this), 20);
      },
      controllerAs: "vm",
      template: [
        '<p>{{vm.current}}</p><child current="vm.current"></child>'
      ].join("\n")
    };
  });

  app.directive("child", function(){
    return {
      restrict: "E",
      scope: {},
      bindToController: {current: "="},
      controller: function($scope){
        $scope.$watch(
          "vm.current",
          function(newValue, oldValue){
            console.log("changed: %s -> %s", oldValue, newValue);
          }
        );
        $scope.$watch(
          function(){return this.current;}.bind(this),
          function(newValue, oldValue){
            console.log("changed2: %s -> %s", oldValue, newValue);
          }
        );
      },
      controllerAs: "vm",
      template: [
        '<pre>{{vm.current}}</pre>'
      ].join("\n")
    };
  });

  document.body.innerHTML = '<parent></parent>';
  var inj = angular.bootstrap(document, ["app"]);
  console.log(angular.element(document.body).html());
  inj.get("$rootScope").$apply();
  setTimeout(function(){
    console.log("----------------------------------------");
    console.log(angular.element(document.body).html());
  }, 30);
});
