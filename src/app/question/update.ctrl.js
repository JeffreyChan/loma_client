(function () {
    angular
        .module("lomaApp")
        .controller("quesUpdateCtrl", quesUpdateCtrl);

    quesUpdateCtrl.$inject = [
        "_",
        "$scope",
        "$timeout",
        "modalData",
        "commonService",
        "$uibModalInstance",
        "categoryService",
        "questionService",
        "popupService"];
    function quesUpdateCtrl(
        _,
        $scope,
        $timeout,
        modalData,
        commonService,
        $uibModalInstance,
        categoryService,
        questionService,
        popupService) {

        var vm = this;
        vm.formData = {};
        vm.answerOptions = [];

        vm.popupOptionForm = function (entityId, itemIndex) {
            entityId = entityId || "";
            var customModalOptions = {
                closeButtonText: 'Cancel',
                okButtonText: 'Sumbit',
                headerText: "update Question Option"
            };

            var option = _.find(vm.formData.options, function (item) {
                return _.isEqual(entityId, item._id);
            });

            var modalDefaults = {
                templateUrl: "tmp/question/option.view.html",
                controller: "optionCtrl",
                controllerAs: "vm",
                resolve: {
                    modalData: function () {
                        return {
                            options: customModalOptions,
                            option: {
                                _id: option._id,
                                answer: option.answer
                            }
                        };
                    }
                }
            };

            popupService.showModal(modalDefaults, customModalOptions).then(function (result) {
                vm.formInfo = "Update Question Option done!";
                $timeout(function () {
                    vm.answerOptions[itemIndex] = result;
                }, 500);
            });
        };

        vm.doGetQuestion = function (questionId) {
            questionService.getQuestionById(questionId)
                .success(function (data) {
                    vm.doGetChildCategory();
                    _.each(data.entity.options, function (item) {
                        vm.answerOptions.push(item);
                    });
                    vm.formData = data.entity;
                })
                .error(function (errorInfo) {
                    vm.formError = errorInfo.error;
                });
        }

        vm.doGetChildCategory = function () {
            categoryService.getchildCategory()
                .success(function (data) {
                    vm.catList = data.entity;
                }).error(function (err) {
                    vm.formError = "Sorry, something's gone wrong, please try again later";
                });
        }

        vm.doUpdateQuestion = function (questionEntity) {
            questionService.updateQuestion(questionEntity)
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
            vm.doUpdateQuestion(vm.formData);
        };



        vm.modalData = modalData;
        vm.formError = "";

        vm.doGetQuestion(vm.modalData.questionId);

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