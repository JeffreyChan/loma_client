(function () {
    angular
        .module("lomaApp")
        .controller("examReviewCtrl", examReviewCtrl);

    examReviewCtrl.$inject = [
        "_",
        "$scope",
        "$timeout",
        "modalData",
        "commonService",
        "$uibModalInstance",
        "examService",
        "popupService"];
    function examReviewCtrl(
        _,
        $scope,
        $timeout,
        modalData,
        commonService,
        $uibModalInstance,
        examService,
        popupService) {

        var vm = this;

        vm.modalData = modalData;
        vm.formError = "";
        vm.formData = {};
        vm.windowsCount = 10;

        vm.modal = {
            ok: function (result) {
                $uibModalInstance.close(result);
            },
            cancel: function () {
                $uibModalInstance.dismiss('cancel');
            }
        };

        vm.findAnswerIndex = function (queId) {

            //step 1 get user answerid
            var answerId = _.find(vm.formData.examrecord.answerQuestions, function (item) {
                return _.isEqual(item.Q, queId);
            }).A;
            var question = _.find(vm.formData.questions, function (item) {
                return _.isEqual(item._id, queId);
            });
                
            return question.options.getIndexBy("_id", answerId) + 1;
        }

        vm.IsCorrect = function (queId) {
            //step 1 get user answerid
            var answerId = _.find(vm.formData.examrecord.answerQuestions, function (item) {
                return _.isEqual(item.Q, queId);
            }).A;
            var question = _.find(vm.formData.questions, function (item) {
                return _.isEqual(item._id, queId);
            });
            return _.isEqual(question.correct, answerId);
        }

        vm.doGetReviewRcord = function () {
            examService.getReviewRecord(vm.modalData.record._id).success(function (data) {
                vm.formData = data.entity;
                vm.windowQuestionList = _.chain(vm.formData.questions).groupBy(function (element, index) {
                    return Math.floor(index / vm.windowsCount);
                }).toArray().value();

                popupService.closeDialog();
            }).error(function (err) {
                popupService.closeDialog();
                vm.formError = "Sorry, something's gone wrong, please try again later";
            });
        }
        popupService.showDialog();
        $timeout(function () {
            vm.doGetReviewRcord();
        }, 1500)

    }
})();