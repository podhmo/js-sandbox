describe("Restangular", function() {
  var benv = require('benv');
  var _angular;

  before(function(done) {
    benv.setup(function() {
      global.Node = window.Node;
      benv.expose({
        angular: benv.require('../node_modules/angular/angular.js', 'angular')
      });
      _angular = global.angular;
      global._ = require('lodash');
      require('restangular');
      require('angular-mocks');
      done();
    });
  });

  it("hmm", function(done){
    var angular = _angular;
    angular.module("app", ["restangular", "ngMock"])
    .factory("submitService", ["Restangular", function(Restangular){
      return {
        submit: function(){
          return Restangular.all("users").getList();
        }
      };
    }]);

    var injector = angular.injector(["ng", "ngMock", "app"]);
    var $httpBackend = injector.get("$httpBackend");
    $httpBackend.when("GET", "/users", [{"name": "foo"}]);

    var p = injector.get("submitService").submit().then(function(response){
      console.log(response);
      done();
    });
    console.log(p);
  });

  after(function(done){
    benv.teardown();
    done();
  })
});
