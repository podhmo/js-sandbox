'use strict';

function Controller(){
}

module.exports = function($parse){
  return {
    restrict: 'E',
    scope: {},
    bindToController: {
      'x': '@',
      'y': '=',
      'z': '&'
    },
    controller: Controller,
    controllerAs: 'b',
    templateUrl: 'partials/binding.html',
    link: function(scope, element, attrs, ctrl){
      ctrl.x = $parse(attrs.x)(scope.$parent);
      ctrl.y = $parse(attrs.y)(scope.$parent);
      ctrl.z = $parse(attrs.z)(scope.$parent);
    }
  };
};

