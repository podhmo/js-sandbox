require('../setup')(function(angular){
  'use strict';
  require('angular-mocks');
  var app = angular.module("app", ["ngMockE2E"]);

  var E = "on404";

  app.run(function($rootScope){
    //console.log($rootScope.$id);
    $rootScope.$on(E, function(e, err){
      console.log("! catch %s", JSON.stringify(err));
    });
  });

  function client($http){
    return {
      fetch: function fetch(id){
        return $http({
          method: "GET",
          url: "/news/" + id,
        });
      }
    };
  }
  app.factory("client", client);

  app.run(function($httpBackend){
    $httpBackend.whenGET("/news/1").respond(
      200,
      {
        "name": "foo",
        "message": "hello"
      },
      {}
    );
    $httpBackend.whenGET("/news/404").respond(
      404,
      {
        "message": "not found"
      },
      {}
    );
  });

  var inj = angular.injector(["app", "ng", "ngMockE2E"]);
  var c = inj.get("client");
  var $rootScope = inj.get("$rootScope");
  var scope = $rootScope.$new(true, $rootScope);

  console.log("call 404;");
  c.fetch(404).then(function(response){
    console.log("success: %s", JSON.stringify(response.data));
    return response.data;
  }, function(err){
    console.log("failure: %s", JSON.stringify(err));
    scope.$emit(E, err);
    return err;
  }).then(function(){
    console.log("----------------------------------------");
    var childScope = $rootScope.$new(true, $rootScope);
    var grandChildScope = childScope.$new(true, childScope);

    childScope.$on(E, function(e){
      console.log("intercept!");
      e.stopPropagation();
    });

    console.log("call 404;");
    c.fetch(404).then(function(response){
      console.log("success: %s", JSON.stringify(response.data));
      return response.data;
    }, function(err){
      console.log("failure: %s", JSON.stringify(err));
      grandChildScope.$emit(E, err);
      return err;
    });
  });
});
