(function () {
  angular
    .module("lomaApp")
    .controller("dashboradCtrl", dashboradCtrl);

  dashboradCtrl.$inject = ['$scope'];
  function dashboradCtrl($scope) {
    $scope.loadingView = true;
    console.log("hello DashBorad");
  }
})();