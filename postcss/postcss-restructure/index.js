'use strict';

var path = require('path');
var fs = require('fs');

var postcss = require('postcss');
var mkdirp = require('mkdirp');

function Ob(opts) {
  this.root = opts.root || "./tmp";
  this.dest = opts.dest || "base";
  this.dirCandidates = opts.dirCandidates || ["pc", "sp", "common"];
  this.defaultDir = this.dir = opts.defaultDir || "common";
  this.tmp = [];
  this.destMap = new Map();
}

Ob.prototype.destPath = function destPath(){
  var pathname = path.join(this.root, this.dir, this.dest);
  if(!pathname.endsWith(".css")) {
    pathname += ".css";
  }
  return pathname;
};

Ob.prototype.isMoveMarker = function isMoveMarker(text){
  return text.startsWith("@restructure(") && text.endsWith(")");
};

Ob.prototype.changeDest = function changeDest(node){
  var text = node.text.replace(/\s/g, "");
  this.dest = text.substring(13, text.length - 1);
  this.dir = this.defaultDir;
};

Ob.prototype.move = function move(node){
  if(!node.selector) {
    this.tmp.push(node);
  } else {
    var m = /^s*\.(\S+)/.exec(node.selector);
    if (m && this.dirCandidates.some(function(e){ return e === m[1]; })) {
      this.dir = m[1];
    } else {
      this.dir = this.defaultDir;
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
  var root = this.destMap.get(dest);
  if (!root) {
    root = this.createDestNode();
    this.destMap.set(dest, root);
  }
  root.append(node);
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
    return new Promise(function(resolve){
      ob.destMap.forEach(function(v, k){
        mkdirp(path.dirname(k), function(err){
          var content = v.toResult().css;
          fs.appendFile(k, content, 'utf-8', function(err){
            return fs.writeFile(k, content, 'utf-8', function(err){
            });
          });
        });
      });
      resolve();
    });
  };
});
