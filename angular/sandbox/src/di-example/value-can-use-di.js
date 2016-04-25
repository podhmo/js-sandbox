'use strict';

require('console-angular').setup((angular) => {
  class FooMyService {
  }
  class BarMyService {
  }
  class DeviceDetector {
    isMobile() {
      return true;
    }
  }
  angular.module("app", [])
    .service('DeviceDetector', DeviceDetector)
    .value('myService', (DeviceDetector) => {
      return DeviceDetector.isMobile()? FooMyService : BarMyService;
    });

  const inj = angular.injector(["ng", "app"]);
  const fn = inj.get('myService');

  console.log(`name: ${fn.name}`);
  console.log(fn(inj.get("DeviceDetector")));
});
