var ca = require("console-angular");

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

  app.directive("parent", function Parent($timeout){
    return {
      restrict: "E",
      scope: {},
      bindToController: {},
      controller: function(){
        this.title = "";
        $timeout(function(){ this.title = "updated"; }.bind(this), 20);
      },
      controllerAs: "p",
      template: '<child ng-if=":: !!p.title" title="p.title"></child>'
    };
  });

  app.directive("child", function Child(){
    return {
      restrict: "E",
      scope: {},
      bindToController: {
        "title": "&"
      },
      controller: function(){},
      controllerAs: "c",
      template: '<pre>{{ ::c.title() }}</pre>'
    };
  });

  document.body.innerHTML = '<parent></parent>';
  var injector = angular.bootstrap(document, ["app"]);
  injector.get("$rootScope").$apply();

  pp(angular.element(document.body).html());

  setTimeout(function(){
    console.log("updated:");
    pp(angular.element(document.body).html());
  }, 30);
});
