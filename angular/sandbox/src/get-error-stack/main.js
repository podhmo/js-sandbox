'use strict';

require('console-angular').setup((angular, document) => {
  const m = angular.module('app', []);

    function ExceptionHandlerProvider($provide) {
        $provide.decorator('$exceptionHandler',
            ['$delegate', exceptionHandler]);
    }

    function exceptionHandler($delegate) {
        return function (ex, cause) {
          console.log(ex.stack);
          console.log("@", ex, cause);
        };
    }

  // controller
  class MyController {
    constructor($timeout){
      this.name = "c";
      console.log({}.name.bar);
    }
  }

  m.directive('my', [() => {
    return {
      restrict: 'E',
      controller: MyController,
      controllerAs: "ctrl",
      scope: {},
      bindToController: {
      },
      template: `<p>{{ ctrl.name }}</p`
    }
  }]);

  m.config(['$provide', ExceptionHandlerProvider]);
  document.body.innerHTML = `
  <div><my></my></div>
    `;
  var inj = angular.bootstrap(document, ["app"]);
  console.log(angular.element(document.body).html());
});
