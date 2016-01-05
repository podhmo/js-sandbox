'use strict';


function DummyAPI(Restangular){
  this.Restangular = Restangular;
}

DummyAPI.prototype.submit = function submit(){
  var data = {"submitId": "xxxx", "submitName": "yyyy","submitPassword": "zzzz"};
  console.log("before: %s", JSON.stringify(data));
  return this.Restangular.all("dummies").post(data).then(function(response){
    console.log("after: %s", JSON.stringify(data));
    console.log("%o", response);
    return response;
  });
};

function dummy(Restangular){
  return new DummyAPI(Restangular);
}
dummy.$inject = ["Restangular"];

module.exports = {
  dummy: dummy
};
