'use strict';
var benv = require('benv');

function setup(cb){
  benv.setup(function(){
    global.Node = window.Node;
    benv.expose({
      angular: benv.require(require.resolve("angular/angular"), "angular")
    });
    cb(window.angular);
  });
}

setup(function(angular){
  global._ = require('underscore');
  require('restangular');
  require('angular-mocks');

  require('./src/app');
  var injector = angular.injector(["ng", "app", "ngMockE2E"]);
  var useNewsService = injector.get("useNewsService");

  var k = useNewsService.use("1");
  k.then(function(data){
    return data;
  })
  .catch(function(data){
    console.log(data);
  });
});

