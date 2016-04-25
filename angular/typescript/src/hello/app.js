var angular = require('angular');
var component_1 = require("./component");
angular
    .module("app", [])
    .controller(component_1.HelloTagDefinition.tag, component_1.HelloTagDefinition.ddo);
