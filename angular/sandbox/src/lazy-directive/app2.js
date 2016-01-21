function pp(e){
  var s = e.toString();
  console.log(s.replace(/class="ng-isolate-scope"/g, "@").replace(/class="ng-binding"/g, "%"));
}

require('../setup')(function(angular){
  var app = angular.module("app", []);

  function ParentController($timeout){
    $timeout(function(){
      this.user = {"name": "foo", "age": 20};
      this.state = "loaded";
    }.bind(this), 30);
    this.state = "loading...";
    this.user = null;
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
        '<child name="parent.user.name" age="parent.user.age"></child>',
        '<p>{{parent.state}}</p>',
        '</div>'
      ]
    };
  }

  function ChildController(){
  }

  function ChildDirective(){
    return {
      restrict: "E",
      scope: {},
      bindToController: {
        name: "&",
        age: "&",
      },
      controller: ChildController,
      controllerAs: "child",
      template: [
        "<p>{{::child.name()}}({{::child.age()}})</p>"
      ].join("\n")
    };
  }

  app.directive("parent", ParentDirective);
  app.directive("child", ChildDirective);

  document.body.innerHTML = '<parent></parent>';
  angular.bootstrap(document, ["app"]);

  function watch(n){
    if(n > 0) {
      pp(angular.element(document.body).html());
      setTimeout(watch.bind(this, n-1), 10);
    }
  }
  watch(5);
});
