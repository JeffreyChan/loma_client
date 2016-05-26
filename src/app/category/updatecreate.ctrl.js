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
        vm.formError = "Sorry, something's gone wrong, please try again later";
      });

    vm.modalData = modalData;
    vm.formError = "";
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
        vm.doAddCategory(vm.formData);
      } else {
        return false;
      }
    };

    vm.doAddCategory = function (categoryData) {
      categoryService.createCategory(categoryData)
        .success(function (data) {
          console.log("right");
          vm.modal.ok(data);
        })
        .error(function (errorInfo) {
          vm.formError = errorInfo.error;
        });
      return false;
    };
  }
})();