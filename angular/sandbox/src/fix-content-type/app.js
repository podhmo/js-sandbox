require('../setup')(function(angular){
  'use strict';

  function callAPI($http){
    var data = {
      method: "GET",
      url: "http://localhost:8000",
    };
    return function(opts){
      console.log("input: %s", JSON.stringify(opts));
      return $http(Object.assign({}, data, opts))
        .then(function(response){
          console.log("Content type: %s", response.data.CONTENT_TYPE);
        }).catch(function(err){
          console.log("!");
          console.log(err);
        });
    };
  }
  callAPI.$inject = ["$http"];

  angular.module("app", [])
    .factory("callAPI", callAPI);

  var inj = angular.injector(["app", "ng"]);
  var api = inj.get("callAPI");
  api({}).then(function(){
    return api({headers: {"Content-Type": "application/json"}});
  }).then(function(){
    return api({headers: {"Content-Type": "application/json"}, data: ""});
  });
});
