require('../setup')(function(angular){
  var app = angular.module("app", []);

  var userTemplate = [
    "<dl>",
    "<dt>{{::u.name}}</dt>",
    "<dd><info item=\"u.info\"></info</dd>",
    "</dl>"
  ].join("\n");

  function UserDirective(){
    function UserController(){
      this.name = "foo";
    }
    return {
      retrict: "E",
      controller: UserController,
      controllerAs: "u",
      scope: {},
      bindToController: {},
      template: userTemplate
    };
  }
  var infoTemplate = [
    "<pre>info: {{::i.item().description}}</pre>"
  ].join("\n");

  function InfoDirective(){
    function InfoController(){
     }
    return {
      retrict: "E",
      controller: InfoController,
      controllerAs: "i",
      scope: {},
      bindToController: {
        "item": "&"
     },
      template: infoTemplate
    };
  }

  app.directive("user", UserDirective);
  app.directive("info", InfoDirective);

  var injector = angular.injector(["ng", "app"]);
  var $rootScope = injector.get("$rootScope");
  var $compile = injector.get("$compile");

  var dom = [
    "<div><user></user></div>"
  ].join("\n");

  var tree = $compile(dom)($rootScope);
  $rootScope.$apply();

  function peek(){
    console.log("----------------------------------------");
    console.log(angular.element(tree).html());
  }

  peek();
  $rootScope.$apply();
  peek();
});
