(function () {
  angular
    .module("lomaApp")
    .controller("questionCtrl", questionCtrl);

  questionCtrl.$inject = [
    '$scope',
    "$uibModal",
    "commonService",
    "popupService",
    "categoryService",
    "questionService",
    "$timeout",
    "Notification"];
  function questionCtrl(
    $scope,
    $uibModal,
    commonService,
    popupService,
    categoryService,
    questionService,
    $timeout,
    Notification) {
    var vm = this;

    vm.showNumEntries = [10, 25, 50, 100];
    vm.pageCount = vm.showNumEntries[0];
    vm.currentPage = 1;
    vm.totalItems = 0;
    // Limit number for pagination size.
    vm.pageMaxSize = 10;

    vm.initQuestionList = function (page, size) {
      questionService.getQuestionList(page, size)
        .success(function (data) {
          if (commonService.isEmptyOrNull(data.entity)) {
            Notification.error({ message: "No question found!", delay: 5000 });
          }
          vm.totalItems = data.entity.totalNum;
          vm.questionData = data.entity.data || [];
          vm.pageStart = (vm.currentPage - 1) * vm.pageCount + 1;
          var tmpEnd = vm.pageStart + vm.pageCount - 1;
          vm.pageEnd = tmpEnd < vm.totalItems ? tmpEnd : vm.totalItems;
        })
        .error(function (e) {
          Notification.error({ message: "Sorry, something's gone wrong, please try again later", delay: 5000 });
        });
    };

    $scope.$watch('vm.pageCount', function () {
      vm.initQuestionList(vm.currentPage, vm.pageCount);
    });

    vm.pageChanged = function () {
      vm.initQuestionList(vm.currentPage, vm.pageCount);
    };

    vm.delayInfo = function (message) {
      $scope.$apply(function () {
        vm.infoMessage = message;
      });
    };

    vm.popupremoveForm = function (entityid) {
      var customModalOptions = {
        closeButtonText: 'Cancel',
        okButtonText: 'Confirm',
        headerText: "Delete Category",
        bodyText: "Are you sure you want to delete this category?",
        entityId: entityid
      };

      popupService.showModal({}, customModalOptions).then(function (result) {
        categoryService.removeCategory(customModalOptions.entityId)
          .success(function (data) {
            $timeout(function () {
              vm.initCategoryList();
            }, 500);

            Notification.success("Delete category successfully");
          })
          .error(function (errorInfo) {
            Notification.error({ message: errorInfo.error, delay: 5000 });
          });
      });
    }

    vm.popupCreateForm = function () {
      var customModalOptions = {
        closeButtonText: 'Cancel',
        okButtonText: 'Sumbit',
        headerText: "Create Question"
      };

      var modalDefaults = {
        templateUrl: "tmp/question/create.view.html",
        controller: "quesCreateCtrl",
        controllerAs: "vm",
        resolve: {
          modalData: function () {
            return {
              options: customModalOptions
            };
          }
        }
      };

      popupService.showModal(modalDefaults, customModalOptions).then(function (result) {
        /*var tmpMessage = customModalOptions.isCreateFlag ? "Create Category done!" : "Update Category done!";
        Notification.success(tmpMessage);
        $timeout(function () {
          vm.initCategoryList(vm.currentPage, vm.pageCount);
        }, 500);*/
      });
    };
  }
})();