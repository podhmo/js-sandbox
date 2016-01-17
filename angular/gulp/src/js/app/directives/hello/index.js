'use strict';

function HelloController($scope){
  'ngInject';
  this.id = $scope.$id;
}

function register(){
  return {
    restrict: 'E',
    controller: HelloController,
    controllerAs: "vm",
    scope: {},
    bindToController: {
      name: "&"
    },
    template: "<p>{{ vm.name() }}: hello(id={{ vm.id }})</p>" // TODO: gulp-angular-templatecache
  };
}

module.exports = {
  tag: "hello",
  register: register
};
