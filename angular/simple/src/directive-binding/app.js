'use strict';
var angular = require('angular');

angular.module("app", [])
  .directive("binding", require('./directives/binding'))
  .directive("control", require('./directives/control'))
  .controller("state", function(){
    this.person = {"name": "foo", "age": 20};
  })
;
