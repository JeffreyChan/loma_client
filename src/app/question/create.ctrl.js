(function () {
    angular
        .module("lomaApp")
        .controller("quesCreateCtrl", quesCreateCtrl);

    quesCreateCtrl.$inject = [
        "_",
        "$scope",
        "modalData",
        "commonService",
        "$uibModalInstance",
        "categoryService",
        "questionService",
        "popupService"];
    function quesCreateCtrl(
        _,
        $scope,
        modalData,
        commonService,
        $uibModalInstance,
        categoryService,
        questionService,
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
            vm.formError = "";
            $scope.$broadcast('show-errors-check-validity');
            if ($scope.questionForm.$invalid) {
                return;
            }
            var answerCount = _.countBy(vm.answerOptions, function (item) {
                return item.isCorrect ? "Right" : "Wrong";
            });
            if (answerCount["Right"] !== 1) {
                vm.formError = "the question's option must have only one right answer!";
                return;
            }
            vm.formData.options = vm.answerOptions;
            vm.doAddQuestion(vm.formData);
        };

        vm.doAddQuestion = function (questionEntity) {
            questionService.createQuestion(questionEntity)
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