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
        vm.windowsCount = 6;

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
        }

        vm.modal = {
            ok: function (result) {
                $uibModalInstance.close(result);
            },
            cancel: function () {
                $uibModalInstance.dismiss('cancel');
            }
        };

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
        popupService.showDialog();
        $timeout(function(){
            vm.doGetExamQuestion();
        },1500)
        
    }
})();