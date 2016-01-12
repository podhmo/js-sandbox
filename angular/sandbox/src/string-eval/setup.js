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

module.exports = setup;
