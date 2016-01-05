'use strict';
var benv = require('benv');

function setup(cb){
  benv.setup(function(){
    global.Node = window.Node;
    benv.expose({
      angular: benv.require('./node_modules/angular/angular.js', 'angular')
    });
    cb();
  });
}

setup(function(){
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
