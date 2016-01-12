'use strict';

module.exports = function ddo(){
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
    },
    link: function(scope, elem, attrs, ctrl){
      scope.$on("submit", function(newval){
        if(!!newval){
          ctrl.$setValidity("server", false);
        }
      });
      // TODO: $destroy?
    }
  };
};
