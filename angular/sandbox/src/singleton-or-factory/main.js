'use strict';

require('./setup')(function(angular){
  var c = require('./counter');

  angular
    .module("app", [])
    .factory("counter", ["$timeout", c.counter])
    .service("useCounter1", function(counter){return {use: counter};})
    .service("useCounter2", function(counter){return {use: counter};})
  ;

  var inj = angular.injector(["ng", "app"]);
  var c1 = inj.get("useCounter1");
  var c2 = inj.get("useCounter2");

  console.log(c1.use());
  console.log(c2.use());
  console.log(c1.use());
});
