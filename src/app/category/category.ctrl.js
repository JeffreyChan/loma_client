(function () {
  angular
    .module("lomaApp")
    .controller("categoryCtrl", categoryCtrl);

  categoryCtrl.$inject = ['$scope'];
  function categoryCtrl($scope) {
    var vm = this;
    vm.message = "yes";
    console.log("hello world");
  }
})();