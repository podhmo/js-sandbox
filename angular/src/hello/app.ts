import * as angular from "angular";

import {HelloTagDefinition} from "./component";

angular
    .module("app", [])
    .directive(HelloTagDefinition.tag, HelloTagDefinition.ddo)
;
