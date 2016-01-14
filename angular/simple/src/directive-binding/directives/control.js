'use strict';

function Controller(){
}

module.exports = function($parse){
  return {
    restrict: 'E',
    scope: {},
    bindToController: {
      "name": "=",
      "age": "="
    },
    controller: Controller,
    controllerAs: 'c',
    templateUrl: 'partials/control.html',
    link: function(scope, element, attrs, ctrl){
      ctrl.name = $parse(attrs.name)(scope.$parent);
      ctrl.age = $parse(attrs.age)(scope.$parent);
    }
  };
};

