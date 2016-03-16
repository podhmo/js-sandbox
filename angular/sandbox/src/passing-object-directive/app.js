'use strict';

function pp(e){
  console.log("----------------------------------------");
  var s = e.toString();
  console.log(s.replace(/class="ng-isolate-scope"/g, "@").replace(/class="ng-binding"/g, "%"));
}

require('../setup')(function(angular){
  var app = angular.module("app", []);

  function ParentController($timeout){
    $timeout(function(){
      this.users = [{"name": "foo", "age": 20}, {"name": "bar", "age": 10}];
    }.bind(this), 30);
 }

  function ParentDirective(){
    return {
      restrict: "E",
      scope: {},
      bindToController: {
      },
      controller: ParentController,
      controllerAs: "parent",
      template: [
        '<div>',
        '<child user="user" ng-repeat="user in parent.users"></child>',
        '</div>'
      ].join("\n")
    };
  }

  function ChildController(){
  // function ChildController(user){ // this is error
    console.log("ho: %s", arguments.length);
    // this.originalUser = user;
  }
  ChildController.prototype.init = function init() {
    this.originalUser = this.user;
  };

  function ChildDirective(){
    return {
      restrict: "E",
      scope: {},
      bindToController: {
        user: "=user"
      },
      link: function(scope){
        scope.child.init();
      },
      controller: ChildController,
      controllerAs: "child",
      template: [
        "<p>originalUser: {{::child.originalUser.name}}({{::child.originalUser.age}})</p>",
        "<p>user: {{::child.user.name}}({{::child.user.age}})</p>"
      ].join("\n")
    };
  }

  app.directive("parent", ParentDirective);
  app.directive("child", ChildDirective);

  document.body.innerHTML = '<parent></parent>';
  var inj = angular.bootstrap(document, ["app"]);
  var $rootScope = inj.get("$rootScope");
  $rootScope.$apply();
  function watch(n){
    if(n > 0) {
      pp(angular.element(document.body).html());
      setTimeout(watch.bind(this, n-1), 10);
    }
  }
  watch(3);
});
