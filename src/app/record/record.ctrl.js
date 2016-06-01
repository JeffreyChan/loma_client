(function () {
  angular
    .module("lomaApp")
    .controller("recordCtrl", recordCtrl);

  recordCtrl.$inject = [
    '$scope',
    "commonService",
    "examService",
    "popupService",
    "$timeout",
    "Notification"];
  function recordCtrl(
    $scope,
    commonService,
    examService,
    popupService,
    $timeout,
    Notification) {
    var vm = this;

    vm.showNumEntries = [10, 25, 50, 100];
    vm.pageCount = vm.showNumEntries[0];
    vm.currentPage = 1;
    vm.totalItems = 0;
    // Limit number for pagination size.
    vm.pageMaxSize = 10;

    vm.popupReviewForm = function (examRecordEntity) {
      var customModalOptions = {
        closeButtonText: 'Cancel',
        okButtonText: 'Confirm',
        headerText: "LOMA Online Testing"
      };

      var modalDefaults = {
        templateUrl: "tmp/record/review.view.html",
        windowClass: "examModal",
        controller: "examReviewCtrl",
        controllerAs: "vm",
        resolve: {
          modalData: function () {
            return {
              options: customModalOptions,
              record: examRecordEntity
            };
          }
        }
      };

      popupService.showModal(modalDefaults, customModalOptions).then(function (result) {

      });
    }

    vm.popupremoveForm = function (entityId) {
      var customModalOptions = {
        closeButtonText: 'Cancel',
        okButtonText: 'Confirm',
        headerText: "Delete Exam Record",
        bodyText: "Are you sure you want to delete this record?",
      };

      popupService.showModal({}, customModalOptions).then(function (result) {
        examService.removeRecord(entityId)
          .success(function (data) {
            popupService.showDialog();
            $timeout(function () {
              vm.initRecordsList(vm.currentPage, vm.pageCount);
              popupService.closeDialog();
              Notification.success("Delete record successfully");
            }, 500);
          })
          .error(function (errorInfo) {
            Notification.error({ message: errorInfo.error, delay: 5000 });
          });
      });
    }

    vm.initRecordsList = function (page, size) {
      examService.getExamRecords(page, size)
        .success(function (data) {
          if (commonService.isEmptyOrNull(data.entity)) {
            Notification.error({ message: "No question found!", delay: 5000 });
          }
          vm.totalItems = data.entity.totalNum;
          vm.recordsData = data.entity.data || [];
          vm.pageStart = (vm.currentPage - 1) * vm.pageCount + 1;
          var tmpEnd = vm.pageStart + vm.pageCount - 1;
          vm.pageEnd = tmpEnd < vm.totalItems ? tmpEnd : vm.totalItems;
        })
        .error(function (e) {
          Notification.error({ message: "Sorry, something's gone wrong, please try again later", delay: 5000 });
        });
    };

    $scope.$watch('vm.pageCount', function () {
      vm.initRecordsList(vm.currentPage, vm.pageCount);
    });

    vm.pageChanged = function () {
      vm.initRecordsList(vm.currentPage, vm.pageCount);
    };
  }
})();