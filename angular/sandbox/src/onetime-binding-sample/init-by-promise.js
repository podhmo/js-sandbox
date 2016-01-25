var ca = require('console-angular');

function pp(e){
  var s = e.toString();
  var replaced = s
      .replace(/class="ng-isolate-scope"/g, "@")
      .replace(/class="ng-scope"/g, "*")
      .replace(/class="ng-binding"/g, "%")
  ;
  console.log(replaced);
}

ca.setup(function(angular){
  var app = angular.module("app", []);

  app.directive("item", function($timeout){
    return {
      restrict: "E",
      scope: {},
      bindTocontroller: {},
      controller: function(){
        Object.defineProperty(this, "title", {get: function(){return this._title;}});

        $timeout(function(){
          this._title = "updated";
        }.bind(this), 20);
      },
      controllerAs: "c",
      template: "<p>{{  ::c.title }}"
    };
  });

  document.body.innerHTML = '<item></item>';
  var injector = angular.bootstrap(document, ["app"]);
  injector.get("$rootScope").$apply();

  pp(angular.element(document.body).html());

  setTimeout(function(){
    console.log("update:");
    pp(angular.element(document.body).html());
  }, 30);
});


