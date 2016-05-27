(function () {
  angular
    .module("lomaApp")
    .controller("categoryCtrl", categoryCtrl);

  categoryCtrl.$inject = ['$scope', "$uibModal", "commonService", "popupService", "categoryService", "$timeout", "Notification"];
  function categoryCtrl($scope, $uibModal, commonService, popupService, categoryService, $timeout, Notification) {
    var vm = this;
    vm.initCategoryList = function () {
      categoryService.getCategoryList()
        .success(function (data) {
          if (commonService.isEmptyOrNull(data.entity)) {
            Notification.error({ message: "No category found!", delay: 5000 });
          }

          vm.catListData = data.entity || [];
        })
        .error(function (e) {
          Notification.error({ message: "Sorry, something's gone wrong, please try again later", delay: 5000 });
        });
    };

    vm.initCategoryList();


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
            }, 1000);

            Notification.success("Delete category successfully");
          })
          .error(function (errorInfo) {
            Notification.error({ message: errorInfo.error, delay: 5000 });
          });
      });
    }

    vm.popupCreateOrUpdateForm = function (entityId) {

      var tmpEntity = _.find(vm.catListData, function (cat) {
        return _.isEqual(cat._id, entityId);
      });
      var customModalOptions = {
        closeButtonText: 'Cancel',
        okButtonText: 'Sumbit',
        headerText: commonService.isEmptyOrNull(entityId) ? "Create Category" : "Update Category",
        bodyText: '',
        isCreateFlag: commonService.isEmptyOrNull(entityId)
      };

      var modalDefaults = {
        templateUrl: "tmp/category/updatecreate.view.html",
        controller: "catCreateOrUpdateCtrl",
        controllerAs: "vm",
        resolve: {
          modalData: function () {
            return {
              options: customModalOptions,
              entity: {
                _id: tmpEntity._id,
                name: tmpEntity.name,
                desc: tmpEntity.desc,
                parent: tmpEntity.parent
              }
            };
          }
        }
      };

      popupService.showModal(modalDefaults, customModalOptions).then(function (result) {
        var tmpMessage = customModalOptions.isCreateFlag ? "Create Category done!" : "Update Category done!";
        Notification.success(tmpMessage);
        $timeout(function () {
          vm.initCategoryList();
        }, 1000);
      });
    };
  }
})();