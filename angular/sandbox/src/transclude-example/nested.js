var ca = require('console-angular');

ca.setup(function(angular, document){
  var app = angular.module("app", []);

  app.directive("xxx", function(){
    return {
      restrict: "E",
      scope: {},
      bindToController: {},
      controller: function(){
        this.value = "xxx";
      },
      transclude: true,
      controllerAs: "vm",
      template: [
        "<pre>{{vm.value}}</pre><yyy><div ng-transclude></div></yyy>"
      ].join("\n")
    };
  });
  app.directive("yyy", function(){
    return {
      restrict: "E",
      scope: {},
      bindToController: {},
      controller: function(){
        this.value = "yyy";
      },
      transclude: true,
      controllerAs: "vm",
      template: [
        "<pre>{{vm.value}}</pre><zzz><div ng-transclude></div></zzz>"
      ].join("\n")
    };
  });
  app.directive("zzz", function(){
    return {
      restrict: "E",
      scope: {},
      bindToController: {},
      controller: function(){
        this.value = "zzz";
      },
      transclude: true,
      controllerAs: "vm",
      template: [
        "<pre>{{vm.value}}</pre><div ng-transclude></div>"
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
      controllerAs: "vm",
      template: [
        '<xxx><pre>outside: {{vm.value}}</pre></xxx>'
      ].join("\n")
    };
  });

  document.body.innerHTML = '<page></page>';
  var inj = angular.bootstrap(document, ["app"]);
  inj.get("$rootScope").$apply();
  console.log(angular.element(document.body).html().toString().replace(/<\//g, '\n</'));
});

/*
<page class="ng-isolate-scope"><xxx class="ng-isolate-scope"><pre class="ng-binding">xxx
    </pre><yyy class="ng-isolate-scope"><pre class="ng-binding">yyy
      </pre><zzz class="ng-isolate-scope"><pre class="ng-binding">zzz
        </pre><div ng-transclude=""><div ng-transclude="" class="ng-scope"><div ng-transclude="" class="ng-scope"><pre class="ng-binding ng-scope">outside: page
              </pre>
            </div>
          </div>
        </div>
      </zzz>
    </yyy>
  </xxx>
</page>
*/
