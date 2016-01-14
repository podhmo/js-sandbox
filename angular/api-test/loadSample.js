'use strict';
var benv = require('benv');

function setup(cb){
  benv.setup(function(){
    global.Node = window.Node;
    benv.expose({
      angular: benv.require(require.resolve("angular/angular"), "angular")
    });
    cb(window.angular);
  });
}

setup(function(angular){
  console.log('window is', typeof window);
  console.log('document is', typeof document);
  console.log('angular is', typeof angular);
  console.log('window.angular === angular', window.angular === angular);

  angular.module('myApp', [])
    .controller('helloController', ['$scope', function ($scope) {
      $scope.title = 'Node!';
    }]);

  document.body.innerHTML = '<div ng-controller="helloController">{{ title }}</div>';
  angular.bootstrap(document, ['myApp']);
  console.log(angular.element(document.body).html());
});
