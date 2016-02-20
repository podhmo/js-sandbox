var ca = require('console-angular');

function pp(data){
  console.log(JSON.stringify(data, null,  2));
}

ca.setup(function(angular){
  require('angular-mocks');
  global._ = require('underscore');
  require('restangular');

  function UserService(Restangular){
    this.Restangular = Restangular;
  }
  UserService.prototype.users = function(){
    return this.Restangular.all("users");
  };
  UserService.$inject = ["Restangular"];

  function userBackendMock($httpBackend){
    var users = [
      {name: "foo", age: 20},
    ];
    $httpBackend.whenGET("/users").respond(function(method, path, data, headers){
      console.log(headers);
      return [200, users, {}];
    });
  }
  userBackendMock.$inject = ["$httpBackend"];
  var app = angular.module("app", ["restangular"]);

  app.config(function ($httpProvider) {
    $httpProvider.useApplyAsync(true);
  });
  app.service("UserService", UserService);


  var mock = angular.module("mock", ["ngMockE2E"]);
  mock.run(userBackendMock);

  var injector = angular.injector(["ng", "app", "mock"]);
  var service = injector.get("UserService");

  // listing
  service.users().getList().then(function(data){
    pp(data);
  });
});
