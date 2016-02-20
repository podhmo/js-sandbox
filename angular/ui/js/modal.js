/* global angular */
'use strict';

var app = angular.module("app", ['ui.bootstrap', 'ngAnimate']);

app
  .directive("myModal", function(){
    function ModalInstanceCtrl($scope, $uibModalInstance, items) {
      this.$scope = $scope;
      this.$uibModalInstance = $uibModalInstance;
      this.items = items;
      this.selected = {
        item: items[0]
      };
    }
    ModalInstanceCtrl.prototype.select = function(item){
      this.selected.item = item;
    };
    ModalInstanceCtrl.prototype.ok = function(){
      this.$uibModalInstance.close(this.selected.item);
    };
    ModalInstanceCtrl.prototype.cancel = function(){
      this.$uibModalInstance.dismiss('cancel');
    };
    ModalInstanceCtrl.$inject = ["$scope", "$uibModalInstance", "items"];
    function MyModalCtrl($scope, $uibModal, $log){
      this.$scope = $scope;
      this.$uibModal = $uibModal;
      this.$log = $log;
      this.items = ["item1", "item2", "item3"];
      this.animationsEnabled = true;
    }
    MyModalCtrl.prototype.click = function(){
      var modalInstance = this.$uibModal.open({
        animation: this.animationsEnabled,
        templateUrl: 'myModalContent.html',
        bindToController: {},
        controller: ModalInstanceCtrl,
        controllerAs: 'vm',
        resolve: {
          items: function () {
            return this.items;
          }.bind(this)
        }
      });

      modalInstance.result.then(function (selectedItem) {
        this.selected = selectedItem;
      }.bind(this), function () {
        this.$log.info('Modal dismissed at: ' + new Date());
      }.bind(this));
    };
    return {
      restrict: "E",
      scope: {},
      bindToController: {},
      controller: MyModalCtrl,
      controllerAs: 'vm',
      templateUrl: 'myModal.html'
    };
  })
;
