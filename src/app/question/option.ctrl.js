(function () {
    angular
        .module("lomaApp")
        .controller("optionCtrl", optionCtrl);

    optionCtrl.$inject = [
        "_",
        "$scope",
        "modalData",
        "commonService",
        "$uibModalInstance",
        "questionService"];
    function optionCtrl(
        _,
        $scope,
        modalData,
        commonService,
        $uibModalInstance,
        questionService) {

        var vm = this;

        vm.doUpdateOption = function (questionOption) {
            questionService.updateOption(questionOption)
                .success(function (data) {
                    vm.modal.ok(data.entity);
                })
                .error(function (errorInfo) {
                    vm.formError = errorInfo.error;
                });
            return false;
        };

        vm.onSubmit = function () {
            vm.formError = "";
            $scope.$broadcast('show-errors-check-validity');
            if ($scope.optionForm.$invalid) {
                return;
            }
            vm.doUpdateOption(vm.formData);
        };


        vm.formData = {};
        vm.modalData = modalData;
        vm.formData = vm.modalData.option;
        vm.modal = {
            ok: function (result) {
                $uibModalInstance.close(result);
            },
            cancel: function () {
                $uibModalInstance.dismiss('cancel');
            }
        };
    }
})();