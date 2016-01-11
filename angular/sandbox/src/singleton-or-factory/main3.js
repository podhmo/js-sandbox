'use strict';

require('./setup')(function(angular){
  var c = require('./counter3');

  angular
    .module("app", [])
    .factory("useCounter1", function($timeout){
      return {
        use: c.counter3($timeout)
      };
    })
    .factory("useCounter2", function($timeout){
      return {
        use: c.counter3($timeout)
      };
    })
  ;

  var inj = angular.injector(["ng", "app"]);
  var c1 = inj.get("useCounter1");
  var c2 = inj.get("useCounter2");

  console.log(c1.use());
  console.log(c2.use());
  console.log(c1.use());
});
