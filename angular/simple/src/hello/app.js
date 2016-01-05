'use strict';
var angular = require('angular');
global._ = require('underscore'); // temporary
require('restangular');

var interceptors = require("./interceptors");
var services = require("./services");


function restangularConfig(RestangularProvider){
  RestangularProvider.addRequestInterceptor(interceptors.snakeConverter);
  RestangularProvider.addResponseInterceptor(interceptors.camelConverter);
  RestangularProvider.setBaseUrl("http://localhost:3000/");
}
restangularConfig.$inject = ["RestangularProvider"];


angular.module("app", ["restangular"])
  .config(restangularConfig)
  .factory("dummy", services.dummy)
;

module.exports = {
  submit: function submit(){
    var m = angular.injector(["ng","app"]);
    return m.get("dummy").submit();
  }
};
