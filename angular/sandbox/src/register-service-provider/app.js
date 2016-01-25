var ca = require('console-angular');

// cannot define register service provider.
// work around is below.

function ServiceRegister(m){
  this.m = m;
}
ServiceRegister.prototype.register = function register(name){
  this.m.factory(name, function(){return {name: name}; });
};

ca.setup(function(angular){
  var app = angular.module("app", []);
  var sr = new ServiceRegister(app);

  sr.register("foo");
  sr.register("bar");

  var context = ca.context(angular);
  var inj = context.injector(["app"]);
  // console.log(context.providerCache);
  console.log(inj.get("fooq"));
  console.log(inj.get("bar"));
});
