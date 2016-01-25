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
  UserService.prototype.user = function(id){
    return this.Restangular.one("users", id);
  };
  UserService.$inject = ["Restangular"];

  function userBackendMock($httpBackend){
    var users = [
      {name: "foo", age: 20},
      {name: "bar", age: 10},
      {name: "boo", age: 30},
    ];
    $httpBackend.whenGET("/users").respond(
      200, users, {}
    );
    $httpBackend.whenPOST("/users").respond(function(method, url, data){
      users.push(JSON.parse(data));
      return [201, data, {}];
    });
    $httpBackend.whenGET("/users/0").respond(function(){
      return [200,  users[0], {}];
    });
    $httpBackend.whenGET("/users/1").respond(function(){
      return [200,  users[1], {}];
    });
    $httpBackend.whenGET("/users/2").respond(function(){
      return [200,  users[2], {}];
    });
    $httpBackend.whenPATCH("/users/2").respond(function(method, url, data, headers, params){
      users[2] = JSON.parse(data);
      return [200, "ok", {}];
    });
  }
  userBackendMock.$inject = ["$httpBackend"];
  var app = angular.module("app", ["restangular"]);
  app.service("UserService", UserService);


  var mock = angular.module("mock", ["ngMockE2E"]);
  mock.run(userBackendMock);

  var injector = angular.injector(["ng", "app", "mock"]);
  var service = injector.get("UserService");

  // listing
  service.users().getList().then(function(data){
    pp(data);
  });

  // create
  service.users().post({"name": "me", "age": 1});

  // this is also ok?
  // service.user().getList().then(function(data){
  //   pp(data);
  // });

  // get
  service.user(2).get().then(function(data){
    pp(data);
  });
  service.user(2).patch({"name": "updated", "age": 200}).then(function(data){
    pp(data);
  });

  service.user(2).get().then(function(data){
    pp(data);
  });
});
