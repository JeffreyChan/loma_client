(function () {
    angular
        .module("lomaApp")
        .controller("quesCreateCtrl", quesCreateCtrl);

    quesCreateCtrl.$inject = [
        "$scope",
        "modalData",
        "commonService",
        "$uibModalInstance",
        "categoryService",
        "popupService"];
    function quesCreateCtrl(
        $scope,
        modalData,
        commonService,
        $uibModalInstance,
        categoryService,
        popupService) {

        var vm = this;
        vm.modalData = modalData;
        vm.formError = "";
        vm.formData = {};
        vm.answerOptions = [
            {
                answer: "",
                isCorrect: false
            },
            {
                answer: "",
                isCorrect: false
            }, {
                answer: "",
                isCorrect: false
            }, {
                answer: "",
                isCorrect: false
            }
        ]
        categoryService.getchildCategory()
            .success(function (data) {
                vm.catList = data.entity;
                vm.formData.category = vm.catList[0]._id;
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
            $scope.$broadcast('show-errors-check-validity');
            if ($scope.questionForm.$invalid) {
                //$scope.answerFieldForm.$setDirty();
                return;
            }
            console.log(vm.answerOptions);
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