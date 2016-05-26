(function () {
  angular
    .module("lomaApp")
    .controller("categoryCtrl", categoryCtrl);

  categoryCtrl.$inject = ['$scope', "$uibModal", "commonService", "popupService", "categoryService"];
  function categoryCtrl($scope, $uibModal, commonService, popupService, categoryService) {
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

    vm.popupCreateOrUpdateForm = function (entityId) {

      var customModalOptions = {
        closeButtonText: 'Cancel',
        okButtonText: 'Sumbit',
        headerText: commonService.isEmptyOrNull(entityId) ? "Create Category" : "Update Category",
        bodyText: ''
      };

      var modalDefaults = {
        templateUrl: "tmp/category/updatecreate.view.html",
        controller: "catCreateOrUpdateCtrl",
        controllerAs: "vm",
        resolve: {
          modalData: function () {
            return {
              options: customModalOptions,
              entity: _.find(vm.catListData, function (cat) {
                return _.isEqual(cat._id, entityId);
              })
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