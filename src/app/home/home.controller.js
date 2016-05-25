(function () {
  angular
    .module("lomaApp")
    .controller("homeCtrl", homeCtrl);

  homeCtrl.$inject = ['$scope'];
  function homeCtrl($scope) {
    // Nasty IE9 redirect hack (not recommended)
    if (window.location.pathname !== '/') {
      window.location.href = '/#' + window.location.pathname;
    }
    var vm = this;
    vm.message = "yes";
    console.log("hello world");
  }
})();