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
    template: "/app/directives/hello/hello.html"
  };
}

module.exports = {
  tag: "hello",
  register: register
};
