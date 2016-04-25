'use strict';
var ca = require('console-angular');

ca.setup(function(angular, document){
  require('angular-sanitize');
  var app = angular.module("app", ['ngSanitize']);

  app.directive("page", function(){
    return {
      restrict: 'E',
      scope: {},
      bindToController: {},
      controller: function(){
        this.html = '<pre ng-init="data={1: 2}">xxxx {{ data }}</pre>';
      },
      controllerAs: 'vm',
      template: '<div ng-bind-html="vm.html"></div>'
    };
  });
  document.body.innerHTML = '<page></page>';
  var inj = angular.bootstrap(document, ["app"]);
  inj.get("$rootScope").$apply();
  console.log(angular.element(document.body).html().toString().replace(/</g, '\n<'));
});
