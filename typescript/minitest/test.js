'use static';
// see: https://mochajs.org/
var assert = require("assert");

describe("calculator test", function(){
  function _getTarget(){
    var m = require("./lib/calculator");
    return new m.Caluclator();
  }
  it("initial is zero", function(){
    var target = _getTarget();
    assert.strictEqual(target.value, 0);
  });

  it("updated by add",  function(){
    var target = _getTarget();
    target.add(10);
    assert.strictEqual(target.value, 10);
  });
  
  it("update by add twice", function(){
    var target = _getTarget();
    target.add(10);
    target.add(100);
    assert.strictEqual(target.value, 110);
  })
});
