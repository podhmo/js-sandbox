'use strict';

var path = require('path');
var postcss = require('postcss');

function Ob(opts) {
  this.root = opts.root;
  this.dest = "";
  this.tmp = [];
}

Ob.prototype.destPath = function destPath(){
  return path.join(this.root, this.dir, this.dest);
};

Ob.prototype.isMoveMarker = function isMoveMarker(text){
  return text.startsWith("@move(") && text.endsWith(")");
};

Ob.prototype.changeDest = function changeDest(node){
  var text = node.text.replace(/\s/g, "");
  this.dest = text.substring(6, text.length - 1);
  this.dir = "common";
  this.destMap = {};
};

Ob.prototype.move = function move(node){
  if(!node.selector) {
    this.tmp.push(node);
  } else {
    var m = /^s*\.(\s+)/.exec(node.selector);
    if (m) {
      this.dir = m[0];
    } else {
      this.dir = "common";
    }
    if (!!this.tmp) {
      var self = this;
      this.tmp.forEach(function(e) {
        self._move(e);
      });
      this.tmp = [];
    }
    this._move(node);
  }
};

Ob.prototype._move = function move(node){
  var dest = this.destPath();
  if (!this.destMap[dest]) {
    this.destMap[dest] = this.createDestNode();
  }
  this.destMap.append(node);
};

Ob.prototype.createDestNode = function createDestNode(){
  return postcss.root();
};

Ob.prototype.eat = function eat(node){
  if (node.type === "comment" && this.isMoveMarker(node.text)){
    this.changeDest(node);
  } else {
    return this.move(node);
  }
};

module.exports = postcss.plugin('postcss-restructure', function (opts) {
  opts = opts || {};
  // Work with options here
  var ob = new Ob(opts);
  return function (css) {
    css.nodes.forEach(function(rule){
      ob.eat(rule);
    });
    for (var k in ob.destMap) {
      if (ob.hasOwnProperty(k)) {
        console.log(k);
      }
    }
  };
});
