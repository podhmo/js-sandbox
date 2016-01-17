/// <reference path="../typings/bundle.d.ts" />
/// <reference path="./strict/object.d.ts" />

import serviceSetup from "./services/index";
import mockSetup from "./mocks/index";
import {UseNewsService} from "./services/useNews";

const app = angular.module("app", ["ngMockE2E", "restangular"]);
serviceSetup(app);
mockSetup(app);
