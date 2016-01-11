'use strict';

require('./setup')(function(angular){
  var c = require('./counter');

  function counterFactory($timeout){
    return function(){
      return c.counter($timeout);
    };
  }

  angular
    .module("app", [])
    .factory("counter", ["$timeout", counterFactory])
    .service("useCounter1", function(counter){return {use: counter()};})
    .service("useCounter2", function(counter){return {use: counter()};})
  ;

  var inj = angular.injector(["ng", "app"]);
  var c1 = inj.get("useCounter1");
  var c2 = inj.get("useCounter2");

  console.log(c1.use());
  console.log(c2.use());
  console.log(c1.use());
});
