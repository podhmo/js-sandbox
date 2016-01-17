'use strict';

function HelloController($scope, config){
  'ngInject';
  this.id = $scope.$id;
  this.config = config;
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
    templateUrl: "/app/directives/hello/hello.html"
  };
}

module.exports = {
  tag: "hello",
  register: register
};
