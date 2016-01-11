'use strict';

function counter2($timeout){
  return (function(){
    this.count += 1;
    return this.count;
  })
}

module.exports = {
  counter2: counter2
}
