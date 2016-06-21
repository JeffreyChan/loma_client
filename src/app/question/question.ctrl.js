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
    vm.title = "";
    
    vm.showNumEntries = [10, 25, 50, 100];
    vm.pageCount = vm.showNumEntries[0];
    vm.currentPage = 1;
    vm.totalItems = 0;
    // Limit number for pagination size.
    vm.pageMaxSize = 10;
    
    console.log(vm.title);
    vm.initQuestionList = function (title, page, size) {
      questionService.getQuestionList(title, page, size)
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
      vm.searchQuestion();
    });
    
    vm.searchQuestion = function(){
      vm.initQuestionList(vm.title, vm.currentPage, vm.pageCount);
    }
    
    vm.pageChanged = function () {
      vm.searchQuestion();
    };

    vm.delayInfo = function (message) {
      $scope.$apply(function () {
        vm.infoMessage = message;
      });
    };

    vm.popupremoveForm = function (entityId) {
      var customModalOptions = {
        closeButtonText: 'Cancel',
        okButtonText: 'Confirm',
        headerText: "Delete question",
        bodyText: "Are you sure you want to delete this question?"
      };

      popupService.showModal({}, customModalOptions).then(function (result) {
        questionService.removeQuestion(entityId)
          .success(function (data) {
            popupService.showDialog();
            $timeout(function () {
              vm.searchQuestion();
              popupService.closeDialog();
              Notification.success("Delete question successfully");
            }, 500);
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
        size: "lg",
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
        var tmpMessage = "Create Question done!";
        Notification.success(tmpMessage);
        $timeout(function () {
          vm.searchQuestion();
        }, 500);
      });
    };

    vm.popupUpdateForm = function (entityId) {
      entityId = entityId || "";
      var customModalOptions = {
        closeButtonText: 'Cancel',
        okButtonText: 'Sumbit',
        headerText: "update Question"
      };

      var modalDefaults = {
        templateUrl: "tmp/question/update.view.html",
        size: "lg",
        controller: "quesUpdateCtrl",
        controllerAs: "vm",
        resolve: {
          modalData: function () {
            return {
              options: customModalOptions,
              questionId: entityId
            };
          }
        }
      };

      popupService.showModal(modalDefaults, customModalOptions).then(function (result) {
        var tmpMessage = "Update Question done!";
        Notification.success(tmpMessage);
        $timeout(function () {
          vm.searchQuestion();
        }, 500);
      });
    };
  }
})();