'use strict';

function ContainerController($scope){
  this.$scope = $scope;
  this.name = "foo";
  this.isActive = true;
}
ContainerController.$inject = ["$scope"];
ContainerController.prototype.submit = function submit(){
  var data = {"server": "500 server error"};
  console.log("submit: %s", JSON.stringify(data, null, 2));
  this.errors = data;
  this.$scope.$broadcast("submit", data);
};
ContainerController.prototype.toggle = function toggle(){
  this.isActive = !this.isActive;
};

module.exports = function ddo(){
  return {
    restrict: 'E',
    controller: ContainerController,
    controllerAs: 'vm',
    scope: {},
    bindToController: {
    },
    templateUrl: 'partials/container.html'
  };
};
