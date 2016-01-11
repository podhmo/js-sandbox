'use strict';

function counter($timeout){
  var i = 0;
  return (function(){
    i += 1;
    return i;
  });
}

module.exports = {
  counter: counter
};
