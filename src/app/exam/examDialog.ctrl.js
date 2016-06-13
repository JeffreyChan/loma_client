(function () {
    angular
        .module("lomaApp")
        .controller("examDialogCtrl", examDialogCtrl);

    examDialogCtrl.$inject = [
        "_",
        "$scope",
        "$timeout",
        "modalData",
        "commonService",
        "$uibModalInstance",
        "categoryService",
        "questionService",
        "examService",
        "popupService"];
    function examDialogCtrl(
        _,
        $scope,
        $timeout,
        modalData,
        commonService,
        $uibModalInstance,
        categoryService,
        questionService,
        examService,
        popupService) {

        var vm = this;

        vm.modalData = modalData;
        vm.formError = "";
        vm.formData = {};
        vm.windowsCount = 10;

        vm.onSubmit = function () {
            vm.formError = "";
            var anwserCount = _.countBy(vm.questionList, function (item) {
                return _.find(item.options, function (option) {
                    return option.isCorrect;
                }) ? "answer" : "noanswer";
            });
            if (anwserCount.noanswer > 0) {
                vm.formError = "You have {0} questions need to answer!".format(anwserCount.noanswer);
                return;
            }
            var flatExamData = {
                user: vm.modalData.username,
                category: vm.modalData.categoryId,
                answerQuestions: []

            };
            var flatQA = _.map(vm.questionList, function (question) {
                return {
                    Q: question._id,
                    A: _.find(question.options, function (option) {
                        return option.isCorrect
                    })._id
                }
            });

            flatExamData.answerQuestions = flatQA;

            vm.doCreateExamRecord(flatExamData);
        }

        vm.modal = {
            ok: function (result) {
                $uibModalInstance.close(result);
            },
            cancel: function () {
                $uibModalInstance.dismiss('cancel');
            }
        };
        
        vm.updateCheckOption = function(question, option) {
            _.each(question.options, function(o) {
                    o.isCorrect = false;
            });
            option.isCorrect = true;
        }

        vm.doGetExamQuestion = function () {
            examService.getQuestionsByCategory(vm.modalData.categoryId).success(function (data) {
                vm.questionList = data.entity;

                vm.windowQuestionList = _.chain(vm.questionList).groupBy(function (element, index) {
                    return Math.floor(index / vm.windowsCount);
                }).toArray().value();

                popupService.closeDialog();
            }).error(function (err) {
                popupService.closeDialog();
                vm.formError = "Sorry, something's gone wrong, please try again later";
            });
        }

        vm.doCreateExamRecord = function (examRecord) {
            examService.createExamRecord(examRecord)
                .success(function (data) {
                    vm.modal.ok(data.entity);
                })
                .error(function (errorInfo) {
                    vm.formError = errorInfo.error;
                });
            return false;
        }

        popupService.showDialog();
        $timeout(function () {
            vm.doGetExamQuestion();
        }, 1500)

    }
})();