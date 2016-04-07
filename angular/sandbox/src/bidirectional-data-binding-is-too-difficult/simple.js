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
          onClick: "&"
        },
        template: `
        <a ng-click="vm.onClick()">click</a>`
      };
    }
  }

  class ParentController {
    constructor() {
      this.i = 0;
    }

    count(message) {
      this.i += 1;
      console.log(`${message}${this.i}`);
    }
  }

  class Parent {
    constuctor() {
      console.log("hai");
    }
    static define() {
      return {
        controller: ParentController,
        controllerAs: "vm",
        bindings: {
        },
        template: `
<pre>i: {{vm.i}}</pre>
<child on-click="vm.count('i: ')"></child>`
      };
    }
  }

  angular.module("app", [])
    .component("child", Child.define())
    .component("parent", Parent.define())
  ;

  document.body.innerHTML = `
<parent></parent>
    `;
  const inj = angular.bootstrap(document, ["ng", "app"]);
  inj.get("$rootScope").$apply();
  console.log(angular.element(document.body).html().toString());

  const s = angular.element(document.querySelector('child')).isolateScope();

  s.vm.onClick();
  s.vm.onClick();
  inj.get("$rootScope").$apply();
  console.log(angular.element(document.body).html().toString());
});
