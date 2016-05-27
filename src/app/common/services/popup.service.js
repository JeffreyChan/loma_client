(function () {

    angular
        .module('lomaApp')
        .service('popupService', ["$uibModal", function ($uibModal) {
            var modalDefaults = {
                animation: true,
                backdrop: true,
                keyboard: true,
                templateUrl: '/tmp/common/views/modal.view.html'
            };

            var modalOptions = {
                closeButtonText: 'Close',
                actionButtonText: 'OK',
                headerText: 'Proceed?',
                bodyText: 'Perform this action?'
            };

            this.showModal = function (customModalDefaults, customModalOptions) {
                customModalDefaults = customModalDefaults || {};


                customModalDefaults.backdrop = 'static';

                return this.show(customModalDefaults, customModalOptions);
            };

            this.showDialog = function (customModalDefaults) {
                customModalDefaults = customModalDefaults || {};

                customModalDefaults.backdrop = 'static';
                customModalDefaults.size = "sm";

                customModalDefaults.templateUrl = "/tmp/common/views/dialog.view.html";

                //Create temp objects to work with since we're in a singleton service
                var tempModalDefaults = {};

                //Map angular-ui modal custom defaults to modal defaults defined in service
                angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);
                this.dialogInstance = $uibModal.open(tempModalDefaults);
                return this.dialogInstance;
            };

            this.closeDialog = function () {
                this.dialogInstance.dismiss('cancel');
            }

            this.show = function (customModalDefaults, customModalOptions) {
                //Create temp objects to work with since we're in a singleton service
                var tempModalDefaults = {};
                var tempModalOptions = {};

                //Map angular-ui modal custom defaults to modal defaults defined in service
                angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);
                //Map modal.html $scope custom properties to defaults defined in service
                angular.extend(tempModalOptions, modalOptions, customModalOptions);

                if (!tempModalDefaults.controller) {
                    tmpCtrl.$inject = ['$scope', "$uibModalInstance"];
                    function tmpCtrl($scope, $uibModalInstance) {
                        $scope.modalOptions = tempModalOptions;
                        $scope.modalOptions.ok = function (result) {
                            $uibModalInstance.close(result);
                        };
                        $scope.modalOptions.close = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                    }
                    tempModalDefaults.controller = tmpCtrl;
                }

                return $uibModal.open(tempModalDefaults).result;
            };

        }]);
})();