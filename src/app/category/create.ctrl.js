(function () {
  angular
    .module("lomaApp")
    .controller("categoryCreatCtrl", categoryCreatCtrl);

  categoryCreatCtrl.$inject = ['$scope', "$uibModalInstance", "modalData", "categoryService"];
  function categoryCreatCtrl($scope, $uibModalInstance, modalData, categoryService) {
    var vm = this;
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

    vm.catList = [];
    vm.formData = {
      
    };
    categoryService.getRootCategory()
      .success(function (data) {
        vm.catList = data.entity;
        vm.formData.parent = vm.catList[0]._id;
      }).error(function (err) {
        vm.errorMessage = "Sorry, something's gone wrong, please try again later";
      });
    vm.onSubmit = function () {
      vm.formError = "";
      console.log("ss");
      return false;
    };
  }
})();