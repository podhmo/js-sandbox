'use strict'

require('./setup')(function(angular){
  var c = require('./counter2');

  angular
    .module("app", [])
    .factory("counter", ["$timeout", c.counter2])
    .factory("useCounter1", function(counter){
      var state = {count: 0};
      return {
        use: counter.bind(state)
      };
    })
    .factory("useCounter2", function(counter){
      this.count = 0;
      return {
        use: counter.bind(this)
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
