const angular = require('angular');

import {HelloTagDefinition} from "./component";

angular
    .module("app", [])
    .controller(HelloTagDefinition.tag, HelloTagDefinition.ddo)
;
