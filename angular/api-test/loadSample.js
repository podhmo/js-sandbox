'use strict';
var benv = require('benv');

function setup(cb){
  benv.setup(function(){
    global.Node = window.Node;
    benv.expose({
      angular: benv.require('./node_modules/angular/angular.js', 'angular')
    });
    cb();
  });
}

setup(function(){
  console.log('window is', typeof window);
  console.log('document is', typeof document);
  console.log('angular is', typeof angular);
  console.log('window.angular === angular', window.angular === angular);
});
