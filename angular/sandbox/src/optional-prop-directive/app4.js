require('../setup')(function(angular){
  var app = angular.module("app", []);

  var userTemplate = [
    "<name>{{::u.name}}</name>",
    "<X><item></item</X>",
    "<Y><item info=\"u.item\"></item</Y>",
    "<Z><item ng-if=\"u.item\" info=\"u.item\"></item</Z>",
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
    "<pre>info: {{::i.info().description}}</pre>",
    "<pre ng-if=\"i.info\">info2: {{::i.info().description}}</pre>"
  ].join("\n");

  function InfoDirective($timeout){
    function InfoController(){
     }
    function link(scope, element, attrs, ctrl){
      $timeout(function(){
        ctrl.info = function(){return {"description": "@default@"};};
      }.bind(this), 10);
    }
    return {
      retrict: "E",
      controller: InfoController,
      controllerAs: "i",
      scope: {},
      bindToController: {
        "info": "&?"
     },
      template: infoTemplate,
      link: link
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
