function pp(e){
  var s = e.toString();
  var replaced = s
      .replace(/class="ng-isolate-scope"/g, "@")
      .replace(/class="ng-scope"/g, "*")
      .replace(/class="ng-binding"/g, "%")
  ;
  console.log(replaced);
}

require('../setup')(function(angular){
  var app = angular.module("app", []);

  function directiveFactory(init){
    function definition($timeout){
      function Controller(){
        init.call(this);
        $timeout(function(){
          this.value = "updated";
        }.bind(this), 30);
      }
      return {
        restrict: "E",
        scope: {},
        bindTocontroller: {
        },
        controller: Controller,
        controllerAs: "c",
        template: [
          '<pre>{{ ::c.value }}</pre>'
        ].join("\n")
      };
    }
    definition.$inject = ["$timeout"];
    return definition;
  }

  app.directive("defaultUndefined", directiveFactory(function(){
  }));
  app.directive("defaultNull", directiveFactory(function(){
    this.value = null;
  }));
  app.directive("defaultEmpty", directiveFactory(function(){
    this.value = "";
  }));
  app.directive("defaultString", directiveFactory(function(){
    this.value = "default";
  }));


  document.body.innerHTML = [
    "<div>",
    "<default-undefined></default-undefined>",
    "<default-null></default-null>",
    "<default-empty></default-empty>",
    "<default-string></default-string>",
    "</div>"
  ].join("\n");

  var injector = angular.bootstrap(document, ["app"], {strictDi: true});
  injector.invoke(["$rootScope", function($rootScope){
    $rootScope.$apply();
  }]);
  function watch(n){
    if(n > 0) {
      console.log("----------------------------------------");
      pp(angular.element(document.body).html());
      setTimeout(watch.bind(this, n-1), 10);
    }
  }
  watch(5);

});
