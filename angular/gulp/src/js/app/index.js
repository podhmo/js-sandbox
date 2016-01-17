'use strict';

var angular = require('angular');
var app = angular.module("app", ["app-template"]);
var hello = require('./directives/hello');

app
  .directive(hello.tag, hello.register);
