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

  app.factory("emitOnError", function($q, $rootScope){
    var i = 0;
    function count(){
      i++;
      return i;
    }
    return {
      "request": function(config) {
        config.xxx = count();
        if(!config.yyy){
          config.yyy = [];
        }
        config.yyy.push(count());
        return config;
      },
      "responseError": function(rejection){
        console.log("@@@: %s", JSON.stringify([rejection.config["xxx"],rejection.config["yyy"]]));
        $rootScope.$emit(E, rejection);
        return $q.reject(rejection);
      }
    };
  });

  app.config(function($httpProvider){
    $httpProvider.interceptors.push('emitOnError');
  });

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
  console.log("call 404;");
  c.fetch(404).then(function(response){
    return response.data;
  }).catch(function(err){
    return err;
  });
  c.fetch(404).then(function(response){
    return response.data;
  }).catch(function(err){
    return err;
  });
  c.fetch(404).then(function(response){
    return response.data;
  }).catch(function(err){
    return err;
  });
});
