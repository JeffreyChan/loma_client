(function () {
  angular
    .module("lomaApp")
    .controller("categoryCtrl", categoryCtrl);

  categoryCtrl.$inject = ['$scope', "$uibModal", "popupService", "categoryService"];
  function categoryCtrl($scope, $uibModal, popupService, categoryService) {
    var vm = this;
    vm.errorMessage = "";
    categoryService.getCategoryList()
      .success(function (data) {
        vm.errorMessage = data.length > 0 ? "" : "No category found!";
        vm.catListData = data;
      })
      .error(function (e) {
        vm.errorMessage = "Sorry, something's gone wrong, please try again later";
      });

    vm.popupCreateForm = function () {
      
      var customModalOptions = {
        closeButtonText: 'Cancel',
        okButtonText: 'Sumbit',
        headerText: 'Create Category',
        bodyText: ''
        
      };
      
      var modalDefaults = {
        templateUrl: "/tmp/category/create.view.html",
        controller:"categoryCreatCtrl",
        controllerAs:"vm",
        resolve : {
          modalData : function () {
            return {
              options:customModalOptions,
              entity:"hello"
            };
          }
        }
      };

      popupService.showModal(modalDefaults, customModalOptions).then(function (result) {
        console.log(result);
      });
    };
  }
})();