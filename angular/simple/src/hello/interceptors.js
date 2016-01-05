'use strict';

var angular = require('angular');


function convKey(obj, oldKey, newKey){
  obj[newKey] = obj[oldKey];
  delete obj[oldKey];
  return obj;
}


function toCamel(obj) {
  for (var prop in obj) {
    if (!(prop in obj)) {
      continue;
    }
    if (!obj.hasOwnProperty(prop)) {
      continue;
    }
    var camelName = prop.replace(
        /([^_])(_[a-z])/g,
      function () {
        return arguments[1] + arguments[2][1].toUpperCase();
      }
    );

    if (prop !== camelName) {
      convKey(obj, prop, camelName);
    }
    if (typeof(obj[camelName]) === 'object') {
      obj[camelName] = toCamel(obj[camelName]);
    }
  }
  return obj;
}

function toSnake(obj){
  for (var prop in obj) {
    if (!(prop in obj)) {
      continue;
    }
    if (!obj.hasOwnProperty(prop)) {
      continue;
    }

    var snakeName = prop.replace(/(?:^|\.?)([A-Z])/g, function(x,y){
      return '_' + y.toLowerCase();
    }).replace(/^_/, '');
    if (prop !== snakeName) {
      convKey(obj, prop, snakeName);
    }
    if (typeof(obj[snakeName]) === 'object') {
      obj[snakeName] = toSnake(obj[snakeName]);
    }
  }
  return obj;
}

function camelConverter(data, operation, what, url, response, deferred){
  switch (operation) {
    case 'get':
      data = toCamel(data);
      break;
    case 'getList':
      data = data.map(toCamel);
      break;
  }
  return data;
}

function snakeConverter(element, operation, what, url){
  if (angular.isArray(element)) {
    element = element.map(toSnake);
  } else {
    element = toSnake(element);
  }
  return element;
}

module.exports = {
  toCamel: toCamel,
  toSnake: toSnake,
  snakeConverter: snakeConverter,
  camelConverter: camelConverter
};
