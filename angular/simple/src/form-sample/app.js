'use strict';
var angular = require('angular');
require('angular-messages');

angular.module("app", ["ngMessages"])
  .directive("container", require('./directives/container'))
  .directive("capture", require('./directives/capture'))
;

module.exports = {
  submit: function submit(){
    var m = angular.injector(["ng","app"]);
    return m.get("dummy").submit();
  }
};
