'use strict';

function counter3($timeout){
  var i = 0;
  return (function(){
    // do something with $timeout or other services
    i += 1;
    return i;
  });
}

module.exports = {
  counter3: counter3
};
