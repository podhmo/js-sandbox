// fetching data on constructor of Controller

require('../setup')(function(angular){
  require('angular-route');

  var app = angular.module("app", ["ng", "ngRoute"]);

  function routeConfig($routeProvider){
    $routeProvider
      .when("/A", {
        template: [
          "<cell path=\"'/A'\"></cell>"
        ].join("\n"),
        resolve: {
          data: function(getData){
            return getData("/A").then(function(data){
              console.log(" -- store data: %s", JSON.stringify(data));
              return data;
            });
          }
        }
      })
      .otherwise({
        template: [
          "<cell path=\"'/B'\"></cell>"
        ].join("\n"),
        resolve: {
          data: function(getData){
            return getData("/A").then(function(data){
              console.log(" -- store data: %s", JSON.stringify(data));
              return data;
            });
          }
        }
      })
    ;
  }

  app.config(routeConfig);

  app.factory("getData", function($timeout, $q){
    function dispatch(path){
      if (path === '/A') {
        return {name: "A", message: "this is A"};
      } else {
        return {name: "B", message: "this is B"};
      }
    }
    return function(path){
      console.log("\taction: getData: %s", path);
      return new $q(function(resolve){
        $timeout(function(){
          console.log("\taction: dispatch: %s", path);
          resolve(dispatch(path));
        }, 20);
      });
    };
  });

  app.directive("cell", function(getData){
    return {
      restrict: "E",
      controller: function Controller(){
      },
      scope: {},
      bindToController: {
        "path": "&"
      },
      controllerAs: "c",
      template: '<p>{{c.path()}}</p><pre>{{c.data.message}}</pre>'
    };
  });

  var dom = [
    "<div>",
    "<div ng-view>",
    "<p>hai</p>",
    "<div>",
    "</div>"
  ].join("\n");

  document.body.innerHTML = dom;
  var inj = angular.bootstrap(document, ["app"]);
  var $location = inj.get("$location");
  var $rootScope = inj.get("$rootScope");
  var cell = function(){
    return angular.element(document.querySelector("cell"));
  };

  function watch(N, cb){
    if(N > 0) {
      setTimeout(function(){
        console.log("- - - - - - - - - - - - - - - - - - - - ");
        console.log("\t\t\thtml: %s", cell().html());
        watch(N-1, cb);
      }, 10);
    } else {
      cb && cb();
    }
  }

  console.log("1 /B ----------------------------------------");
  console.log("\t\t\thtml: %s", cell().html());
  watch(3, function(){
  console.log("2 /A----------------------------------------");
    $location.path("/A");
    console.log("\taction: pre $apply");
    console.log("\t\t\thtml: %s", cell().html());
    $rootScope.$apply();
    console.log("\taction: post $apply");
    console.log("\t\t\thtml: %s", cell().html());
    watch(3);
  });
});
