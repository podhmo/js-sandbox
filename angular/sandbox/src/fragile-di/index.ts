/// <reference path="./angular.d.ts" />

interface MySetupFunction {
  (callback: (angular: ng.IAngularStatic) => void): void;
}

declare var require: (module: string) => any;
const setup: MySetupFunction = require("./setup");

setup((angular: ng.IAngularStatic) => {
  const app = angular.module("app", []);

  // registering config
  app.value("config", "this is config");

  // registering service that using the config registered
  class GreetingService {
    constructor(private config: {name: string}) {
    }
    greeting(message: string) {
      // actually, this.config: string. (see: app.value("config") ...)
      return `${this.config.name}: ${message}`;
    }
  }
  GreetingService.$inject = ["config"];
  app.service("GreetingService", GreetingService);


  const injector: ng.auto.IInjectorService = angular.injector(["ng", "app"]);

  const greeting = injector.get<GreetingService>("GreetingService");
  console.log(greeting.greeting("hello"));
  // undefined: hello
});