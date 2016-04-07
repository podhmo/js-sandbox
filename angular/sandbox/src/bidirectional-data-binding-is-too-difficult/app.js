'use strict';
require('console-angular').setup((angular, document) => {
  class ParentController {
    constructor($timeout, $scope) {
      // initialized lazily
      $timeout(() => {
        this.ob = {name: "ob", count: 0, id: 1};
      }, 200);

      // watch
      $scope.$watch(() => {
        // console.log(`\tcheck: ${JSON.stringify(this.ob)}`);
        return this.ob;
      }, (newval) => {
        console.log(`\tchanged: ${JSON.stringify(newval)}`);
      });
    }
  }
  class Parent {
    static define() {
      return {
        controller: ParentController,
        controllerAs: "vm",
        bindings: {},
        template: `
<counter i="vm.ob.count"></counter>
<child ob="vm.ob"></child>`
      };
    }
  }
  class CounterController {
    constructor($timeout) {
      // this.i = 0;
      // somehow, after current digest loop, the data-binding attribute's value is set.
      $timeout(() => {
        this.i = 0;
      }, 0);
    }

    count() {
      this.i += 1;
    }
  }
  class Counter {
    static define() {
      return {
        controller: CounterController,
        controllerAs: 'vm',
        bindings: {
          i: "="
        },
        template: `<a click="vm.count()">click {{vm.i}}</a>`
      };
    }
  }
  class ChildController {
    constructor($scope) {
      $scope.$watch(() => {
        return this.ob;
      }, (newval) => {
        if(!!newval) {
          this.onObFound(newval);
        }
      });
    }

    onObFound(ob) {
      console.log(`\tfound: ${JSON.stringify(ob)}`);
    }
  }

  class Child {
    static define() {
      return {
        controller: ChildController,
        controllerAs: 'vm',
        bindings: {
          ob: "="
        },
        template: `<pre>{{ vm.ob|json }}</pre>`
      };
    }
  }

  angular.module('app', ['console'])
    .component('parent', Parent.define())
    .component('counter', Counter.define())
    .component('child', Child.define())
  ;

  document.body.innerHTML = `<parent></parent>`;
  const inj = angular.bootstrap(document, ["ng", "app"]);
  console.log("----------------------------------------");
  inj.get("$rootScope").$apply();
  console.log(angular.element(document.body).html().toString());
  setTimeout(() => {
    console.log("----------------------------------------");
    inj.get("$rootScope").$apply();
    console.log(angular.element(document.body).html().toString());
  }, 50);
  setTimeout(() => {
    console.log("----------------------------------------");
    inj.get("$rootScope").$apply();
    console.log(angular.element(document.body).html().toString());
  }, 300);
});
