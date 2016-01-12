'use strict';
var angular = require('angular');

angular.module("app", [])
  .directive("binding", require('./directives/binding'))
  .directive("binding2", require('./directives/binding2'))
  .directive("control", require('./directives/control'))
  .controller("state", function(){
    this.person = {"name": "foo", "age": 20};
  })
;
