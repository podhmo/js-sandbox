'use strict';

function HelloController($scope){
  this.name = "";
}
HelloController.$inject = ["$scope"]; // TODO: ng-annotate

function register(){
  return {
    restrict: 'E',
    controller: HelloController,
    controllerAs: "vm",
    scope: {},
    bindToController: {
      name: "="
    },
    template: "<p>{{vm.name}}: hello</p>" // TODO: gulp-angular-templatecache
  };
}

module.exports = {
  tag: "hello",
  register: register
};
