(function () {

  angular.module('underscore', []);
  angular.module('underscore').factory('_', ['$window', function ($window) {
    return $window._; // assumes underscore has already been loaded on the page
  }]);

  angular.module("lomaApp", ["underscore", "ngRoute", "ngSanitize", "ui.bootstrap"]);

  function config($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/tmp/home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .when('/category-list', {
        templateUrl: '/tmp/category/category.view.html',
        controller: 'categoryCtrl',
        controllerAs: 'vm'
      })
      .when('/sya', {
        template: '<h1>hell</h1>'
      })
      .when('/register', {
        template: '<h1>hell</h1>'
      })
      .when('/login', {
        template: '<h1>hell</h1>'
      })
      .otherwise({ redirectTo: '/' });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  }

  angular
    .module('lomaApp')
    .config(['$routeProvider', '$locationProvider', config]);


})();