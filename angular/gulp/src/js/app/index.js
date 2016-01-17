'use strict';

var angular = require('angular');
var app = angular.module("app", []);
var hello = require('./directives/hello');

app
  .directive(hello.tag, hello.register);
