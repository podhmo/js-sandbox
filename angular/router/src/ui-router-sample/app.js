'use strict';
var angular = require('angular');
require('angular-ui-router');

angular
  .module('app', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/state1");
    //
    // Now set up the states
    $stateProvider
      .state('state1', {
        url: "/state1",
        templateUrl: "state1.html"
      })
      .state('state1.list', {
        url: "/list",
        templateUrl: "state1.list.html",
        controller: function($scope) {
          $scope.items = [
            "A", "List", "Of", "Items",
            "A", "List", "Of", "Items",
            "A", "List", "Of", "Items",
          ];
        }
      })
      .state('state2', {
        url: "/state2",
        templateUrl: "state2.html"
      })
      .state('state2.list', {
        url: "/list2",
        templateUrl: "state2.list.html",
        controller: function($scope) {
          $scope.things = [
            "A", "Set", "Of", "Things",
            "A", "Set", "Of", "Things",
            "A", "Set", "Of", "Things",
            "A", "Set", "Of", "Things",
          ];
        }
      });
  })
;
