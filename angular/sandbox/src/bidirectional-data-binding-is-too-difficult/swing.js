'use strict';

require('console-angular').setup((angular, document) => {
  class ParentController {
    constructor(){
      this.value = 0;
    }
    positive() {
      return this.value >= 0;
    }
    negative() {
      return this.value < 0;
    }
  }

  class ChildController {
    /*
      databinding: value, ok, recoveryValue
     */
    constructor($scope) {
      this.$scope = $scope;
      this.init();
    }
    init() {
      this.$scope.$watch(() => this.value, () => {
        if (!this.ok() && this.recoveryValue) {
          this.value = this.recoveryValue;
        }
      });
    }
  }

  angular.module("app", ["console"])
    .component("parent", {
      controller: ParentController,
      controllerAs: "vm",
      bindings: {},
      template: `
        <child id="1" value="vm.value" ok="vm.positive()" recovery-value="1"></child>
        <child id="2" value="vm.value" ok="vm.negative()" recovery-value="-1"></child>
        `
    })
    .component("child", {
      controller: ChildController,
      controllerAs: "vm",
      bindings: {
        value: '=value',
        ok: '&ok',
        recoveryValue: '=recoveryValue'
      },
      template: `<pre>{{vm.value}}</pre>`
    })
  ;

  document.body.innerHTML = `
  <parent></parent>
    `;
  const injector = angular.bootstrap(document.body, ["ng", "app"]);
  injector.get("$rootScope").$apply();

  console.log(angular.element(document.body).html().toString());
});
