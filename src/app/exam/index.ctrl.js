(function () {
    angular
        .module("lomaApp")
        .controller("examCtrl", examCtrl);

    examCtrl.$inject = [
        "_",
        "$scope",
        "$location",
        "$timeout",
        "Notification",
        "categoryService",
        "popupService"];
    function examCtrl(
        _,
        $scope,
        $location,
        $timeout,
        Notification,
        categoryService,
        popupService) {

        var vm = this;
        vm.formData = {};
        vm.formData.userName = "cdjboy";
        vm.onSubmit = function () {
            vm.formError = "";
            $scope.$broadcast('show-errors-check-validity');
            if ($scope.examForm.$invalid) {
                return;
            }
            vm.popupExamForm();
        }

        vm.doGetChildCategory = function () {
            categoryService.getchildCategory()
                .success(function (data) {
                    vm.catList = data.entity;
                    vm.formData.category = vm.catList[14]._id;
                }).error(function (err) {
                    vm.formError = "Sorry, something's gone wrong, please try again later";
                });
        }

        vm.popupExamForm = function () {
            var customModalOptions = {
                closeButtonText: 'Cancel',
                okButtonText: 'Confirm',
                headerText: "LOMA Online Testing"
            };

            var modalDefaults = {
                templateUrl: "tmp/exam/examDialog.view.html",
                windowClass: "examModal",
                controller: "examDialogCtrl",
                controllerAs: "vm",
                resolve: {
                    modalData: function () {
                        return {
                            options: customModalOptions,
                            categoryId: vm.formData.category,
                            categoryName: _.find(vm.catList, function (item) {
                                return _.isEqual(item._id, vm.formData.category);
                            }).name,
                            username: vm.formData.userName
                        };
                    }
                }
            };

            popupService.showModal(modalDefaults, customModalOptions).then(function (result) {
                var tmpMessage = "Your Exam done!";
                Notification.success(tmpMessage);
                $timeout(function(){
                    vm.redirectToRecord();
                }, 2000)    
            });
        }

        vm.redirectToRecord = function () {
            $scope.$apply(function () { $location.path("/record-list"); });
        }

        vm.doGetChildCategory();
    }
})();