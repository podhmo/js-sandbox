var assert = require('assert');

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

  after(function(done){
    benv.teardown();
    done();
  })


  it("/users", function(){
    var angular = _angular;
    angular.module("app", ["restangular"])
    .factory("submitService", ["Restangular", function(Restangular){
      return {
        submit: function(){
          return Restangular.all("users").getList();
        }
      };
    }]);

    var injector = angular.injector(["ng", "ngMockE2E", "app"]);

    var $httpBackend = injector.get("$httpBackend");
    $httpBackend.whenGET("/users").respond(200, [{"name": "foo"}], {});

    return injector.get("submitService").submit().then(function(response){
      assert.equal(response.length, 1);
      assert.strictEqual(response[0].name, "foo");
    });
  });

  /*
  // memo: mocha support asynchronous testing

  it("old version", function(done){
    doPromise().then(function(data){
      assert.eual(data, 1)
    }).then(done, done);
  });

  it("new version", function(){
    return doPromise().then(function(data){
      assert.eual(data, 1)
    });
  });
   */
});
