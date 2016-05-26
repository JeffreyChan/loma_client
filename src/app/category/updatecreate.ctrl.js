(function () {
  angular
    .module("lomaApp")
    .controller("catCreateOrUpdateCtrl", catCreateOrUpdateCtrl);

  catCreateOrUpdateCtrl.$inject = ['$scope', "commonService", "$uibModalInstance", "modalData", "categoryService"];
  function catCreateOrUpdateCtrl($scope, commonService, $uibModalInstance, modalData, categoryService) {
    var vm = this;
    vm.catList = [];
    categoryService.getRootCategory()
      .success(function (data) {
        vm.catList = data.entity;
        vm.formData.parent = vm.catList[0]._id;
      }).error(function (err) {
        vm.errorMessage = "Sorry, something's gone wrong, please try again later";
      });

    vm.modalData = modalData;
    vm.errorMessage = "";
    vm.modal = {
      ok: function (result) {
        $uibModalInstance.close(result);
      },
      cancel: function () {
        $uibModalInstance.dismiss('cancel');
      }
    };

    vm.formData = vm.modalData.entity || {};

    vm.onSubmit = function () {
      if (commonService.isEmptyOrNull(vm.formData._id)) {
        categoryService.createCategory(vm.formData)
          .success(function (data) {
            console.log("right");
            vm.modal.ok(data);
          })
          .error(function (data) {

            vm.formError = "category has not been saved, please try again";
          });
        return false;
      } else {
        return false;
      }
    };

    vm.doAddCategory = function (categoryData) {

    };
  }
})();