'use strict';

require('./setup')(function(angular){
  require('angular-messages');

  angular
    .module("app", ["ngMessages"])
    .controller("ctrl", ["$scope", function($scope){
      $scope.data = {
        "ja": "はい",
        "en": "hai"
      };
    }])
  ;

  document.body.innerHTML = '<div ng-controller="ctrl"><ng-messages for="data" role="alert" ng-messages-multiple><ng-message when="en" multiple>{{data.en}}</ng-message></ng-messages</div>';
  angular.bootstrap(document, ['app']);
  console.log(angular.element(document.body).html());
});
