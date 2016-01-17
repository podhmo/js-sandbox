'use strict';
var angular = require('angular');

function builder(config){
  var app = angular.module("app", ["app-template"]);
  var hello = require('./directives/hello');

  app
    .value("config", config);

  app
    .directive(hello.tag, hello.register);
  return app;
}

module.exports = builder;
