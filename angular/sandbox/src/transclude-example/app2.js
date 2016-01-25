var ca = require('console-angular');

ca.setup(function(angular, document){
  var app = angular.module("app", []);

  app.directive("wrap", function(){
    return {
      restrict: "E",
      scope: {},
      bindToController: {},
      controller: function(){
        this.value = "wrap";
      },
      transclude: true,
      controllerAs: "wrap",
      template: [
        '<div class="wrap"><div>{{wrap.value}}</div><ng-transclude></ng-transclude></div>'
      ].join("\n")
    };
  });

  app.directive("page", function(){
    return {
      restrict: "E",
      scope: {},
      bindToController: {},
      controller: function(){
        this.value = "page";
      },
      controllerAs: "page",
      template: [
        '<wrap><my>{{wrap|json}}</my></wrap>'
      ].join("\n")
    };
  });

  document.body.innerHTML = '<page></page>';
  var inj = angular.bootstrap(document, ["app"]);
  inj.get("$rootScope").$apply();
  console.log(angular.element(document.body).html().toString().replace(/</g, '\n<'));
});
