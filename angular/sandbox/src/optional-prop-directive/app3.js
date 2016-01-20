require('../setup')(function(angular){
  var app = angular.module("app", []);

  var userTemplate = [
    "<dl>",
    "<dt>{{::u.name}}</dt>",
    "<dd><item info=\"u.item\"></item</dd>",
    "<dd><item ng-if=\"u.item\" info=\"u.item\"></item</dd>",
    "</dl>"
  ].join("\n");

  function UserDirective(){
    function UserController($timeout){
      this.name = "foo";
      $timeout(function(){
        this.item = {"description": "this-is-message"};
      }.bind(this), 10);
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
    "<pre>info: {{::i.info.description}}</pre>"
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
        "info": "="
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
  setTimeout(function(){
    peek();
  }, 20);
});
