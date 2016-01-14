require('./setup')(function(angular){
  angular.module("app", []);
  var inj = angular.injector(["ng", "app"]);

  var scope = {
    person: {name: "foo", "age": 20}
  };
  var locals = {
    where: "anywhere"
  };

  // $parse
  var $parse = inj.get("$parse");
  console.log("----------------------------------------");
  console.log('$parse("person.name")');
  console.log($parse("person.name")(scope));
  console.log('$parse("where")');
  console.log($parse("where")(scope,  locals));

  // eval is just a shorthand of $parse
  /*
  $eval: function(expr, locals) {
    return $parse(expr)(this, locals);
  },
  */
  var $eval = inj.get("$rootScope").$eval;
  console.log("----------------------------------------");
  console.log('$eval("person.name")');
  console.log($eval.call(scope, "person.name"));
  console.log('$eval("where")');
  console.log($eval("where", locals));

  // $interpolate
  console.log("----------------------------------------");
  var $interpolate = inj.get("$interpolate");
  console.log('$interpolate("{{person.name}}({{person.age}})"');
  console.log($interpolate("{{person.name}}({{person.age}})")(scope));

  // $compile -- do all.
  console.log("----------------------------------------");
  angular.module("d", [])
    .directive("cell", [function(){
      return {
        restrict: "E",
        controller: function Controller(){
        },
        scope: {},
        bindToController: {
          person: "&"
        },
        controllerAs: "c",
        template: '<dl><dt>name</dt><dd>{{c.person().name}}</dd></dl>'
      };
    }]);

  var injector = angular.injector(["ng", "d"]);
  var $compile = injector.get("$compile");
  var $rootScope = injector.get("$rootScope");
  $rootScope.s = {person: {name: "bar", age: 10}};
  var compiled = $compile("<cell person=\"s.person\"></cell>")($rootScope);
  console.log('$compile("<cell person=\"s.person\"></cell>")');
  console.log(angular.element(compiled).html());
  $rootScope.$apply();
  console.log(angular.element(compiled).html());
});
