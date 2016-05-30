(function () {
    angular
        .module("lomaApp")
        .controller("examDialogCtrl", examDialogCtrl);

    examDialogCtrl.$inject = [
        "_",
        "$scope",
        "modalData",
        "commonService",
        "$uibModalInstance",
        "categoryService",
        "questionService",
        "popupService"];
    function examDialogCtrl(
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
        vm.windowsCount = 1;

        vm.onSubmit = function () {
            vm.formError = "";
            console.log(vm.questionList);
        }

        vm.modal = {
            ok: function (result) {
                $uibModalInstance.close(result);
            },
            cancel: function () {
                $uibModalInstance.dismiss('cancel');
            }
        };

        vm.questionList = [
            {
                "_id": "574baa0026e2b24031bc2c3c",
                "category": "5747e15b0f0f96e42ac4d173",
                "title": "test",
                "tip": "11",
                "correct": "574baa0026e2b24031bc2c38",
                "__v": 0,
                "create_date": "2016-05-30T02:48:32.517Z",
                "random": [
                    0.0785922019276768,
                    0.04945577774196863
                ],
                "options": [
                    {
                        "_id": "574baa0026e2b24031bc2c38",
                        "answer": "1"
                    },
                    {
                        "_id": "574baa0026e2b24031bc2c39",
                        "answer": "2"
                    },
                    {
                        "_id": "574baa0026e2b24031bc2c3a",
                        "answer": "3"
                    },
                    {
                        "_id": "574baa0026e2b24031bc2c3b",
                        "answer": "4"
                    }
                ]
            },
            {
                "_id": "574baa0026e2b24031bc2c3f",
                "category": "5747e15b0f0f96e42ac4d173",
                "title": "test",
                "tip": "11",
                "correct": "574baa0026e2b24031bc2c31",
                "__v": 0,
                "create_date": "2016-05-30T02:48:32.517Z",
                "random": [
                    0.0785922019276768,
                    0.04945577774196863
                ],
                "options": [
                    {
                        "_id": "574baa0026e2b24031bc2c31",
                        "answer": "1"
                    },
                    {
                        "_id": "574baa0026e2b24031bc2c32",
                        "answer": "2"
                    },
                    {
                        "_id": "574baa0026e2b24031bc2c33",
                        "answer": "3"
                    },
                    {
                        "_id": "574baa0026e2b24031bc2c34",
                        "answer": "4"
                    }
                ]
            }
        ];

        vm.windowQuestionList = _.chain(vm.questionList).groupBy(function (element, index) {
            return Math.floor(index / vm.windowsCount);
        }).toArray().value();

        console.log(vm.windowQuestionList);
    }
})();