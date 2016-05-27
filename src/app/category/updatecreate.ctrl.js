(function () {
  angular
    .module("lomaApp")
    .controller("catCreateOrUpdateCtrl", catCreateOrUpdateCtrl);

  catCreateOrUpdateCtrl.$inject = ['$scope', "commonService", "$uibModalInstance", "modalData", "categoryService"];
  function catCreateOrUpdateCtrl($scope, commonService, $uibModalInstance, modalData, categoryService) {
    var vm = this;
    vm.catList = [];
    vm.modalData = modalData;
    vm.formData = vm.modalData.entity || {};
    vm.isCreateFlag = commonService.isEmptyOrNull(vm.formData._id);
    vm.formError = "";

    categoryService.getRootCategory()
      .success(function (data) {
        vm.catList = data.entity;
        vm.formData.parent = vm.catList[0]._id;
      }).error(function (err) {
        vm.formError = "Sorry, something's gone wrong, please try again later";
      });

    vm.modal = {
      ok: function (result) {
        $uibModalInstance.close(result);
      },
      cancel: function () {
        $uibModalInstance.dismiss('cancel');
      }
    };

    vm.onSubmit = function () {
      if (vm.isCreateFlag) {
        vm.doAddCategory(vm.formData);
      } else {
        vm.doUpdateCategory(vm.formData);
      }
    };
    
    vm.doUpdateCategory = function (categoryData) {
      categoryService.updateCategory(categoryData)
        .success(function (data) {
          vm.modal.ok(data.entity);
        })
        .error(function (errorInfo) {
          vm.formError = errorInfo.error;
        });
      return false;
    }
    
    vm.doAddCategory = function (categoryData) {
      categoryService.createCategory(categoryData)
        .success(function (data) {
          vm.modal.ok(data.entity);
        })
        .error(function (errorInfo) {
          vm.formError = errorInfo.error;
        });
      return false;
    };
  }
})();