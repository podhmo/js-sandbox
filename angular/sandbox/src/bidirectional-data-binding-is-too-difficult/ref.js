"use strict";
require("console-angular").setup((angular, document) => {
  class ChildController {
  }

  class Child {
    static define() {
      return {
        controller: ChildController,
        controllerAs: "vm",
        bindings: {
          ob: "&"
        },
        template: `<pre>{{ ::vm.ob()|json }}</pre>`
      };
    }
  }

  class ParentController {
    constructor($timeout) {
      console.log(`*****initialize*****`);
      $timeout(() => {
        this.ob = {id: 1, name: "foo"};
        console.log(`*****changed***** ${angular.toJson(this.ob)}`);
      }, 30);
    }
  }

  class Parent {
    static define() {
      return {
        controller: ParentController,
        controllerAs: "vm",
        bindings: {
        },
        template: `<child ob="::vm.ob"></child>`
      };
    }
  }

  angular.module("app", ["console"])
    .component("child", Child.define())
    .component("parent", Parent.define())
  ;

  document.body.innerHTML = `<parent></parent>`;
  const inj = angular.bootstrap(document, ["ng", "app"]);
  const $timeout = inj.get("$timeout");
  inj.get("$rootScope").$apply();
  console.log(angular.element(document.body).html().toString());
  $timeout(() => {
    console.log(`*****timeout*****`);
    console.log(angular.element(document.body).html().toString());
  }, 100);
});
