'use strict';
var angular = require('angular');
require('angular-route');

angular
  .module('app', ['ngRoute'])
  .config(function ($routeProvider, $locationProvider) {
    // ルーティング設定
    $routeProvider
      .when('/state1.list', {
        templateUrl: 'state1.list.html',
        controller: function($scope){
          $scope.items = [
            "A", "List", "Of", "Items",
            "A", "List", "Of", "Items",
            "A", "List", "Of", "Items",
          ];
        }
      })
      .when('/state2.list', {
        templateUrl: "state2.list.html",
        controller: function($scope){
          $scope.things = [
            "A", "Set", "Of", "Things",
            "A", "Set", "Of", "Things",
            "A", "Set", "Of", "Things",
            "A", "Set", "Of", "Things",
          ];
        }
      })
      .otherwise({
        redirectTo: '/state1.list'
      });
  });
