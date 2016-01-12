'use strict';

function Controller(){
}

module.exports = function(){
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
    templateUrl: 'partials/binding2.html'
  };
};

