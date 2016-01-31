var ca = require("console-angular");

ca.setup(function(angular, document){
  angular.module("app", [])
    .directive("lazy", function(){
      return {
        restrict: "E",
        scope: {},
        bindToController: {
          content: "&"
        },
        controller: function(){},
        controllerAs: "c",
        templateUrl: function(e, attrs){
          return attrs.templateUrl || "/partial/pre.html";
        }
      };
    })
    .run(function($templateCache){
      $templateCache.put("/partial/pre.html", "<pre>content: {{::c.content()}} </pre>");
      $templateCache.put("/partial/title.html", "<h1> {{::c.content()}} </h1>");
    })
  ;

  document.body.innerHTML = [
    '<div>',
    '<lazy content="\'hello this is titile\'" template-url="/partial/title.html"></lazy>',
    '<lazy content="\'hai this is pre\'"></lazy>',
    '</div>'
  ].join("\n");

  var inj = angular.bootstrap(document, ["app"]);
  inj.get("$rootScope").$apply();
  console.log(angular.element(document.body).html());
});

// <div>
// <lazy content="'hello this is titile'" template-url="/partial/title.html" class="ng-isolate-scope"><h1 class="ng-binding"> hello this is titile </h1></lazy>
// <lazy content="'hai this is pre'" class="ng-isolate-scope"><pre class="ng-binding">content: hai this is pre </pre></lazy>
// </div>
