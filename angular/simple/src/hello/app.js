'use strict';
var angular = require('angular');
global._ = require('underscore'); // temporary
require('restangular');

angular.module("app", ["restangular"])
  .config(function(RestangularProvider){
    console.log(RestangularProvider);
  })
;
